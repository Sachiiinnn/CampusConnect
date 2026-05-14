require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { eventSchema } = require("./schema.js");

// Models
const Event = require("./models/event");
const Faq = require("./models/faq.js");
const User = require("./models/user");
const Admin = require("./models/admin");

// Auth Middleware
const { 
  isLoggedIn, 
  verifyUserToken, 
  verifyAdminToken, 
  verifySuperAdmin, 
  errorHandler 
} = require("./middleware/auth.js");

// Security Packages
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const seedSuperAdmin = require("./seeders/superAdmin.js");

// Set security HTTP headers
app.use(helmet());

// Apply CORS
app.use(cors());

// Limit requests from same API (Rate Limiting)
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

// Custom Sanitizer for Express 5
const sanitizeObject = (obj) => {
  if (obj instanceof Object) {
    for (const key in obj) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else {
        sanitizeObject(obj[key]);
      }
    }
  }
};

const customSanitizer = (req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.query) {
    const query = req.query;
    for (const key in query) {
      if (key.startsWith('$') || key.includes('.')) {
        delete query[key];
      }
    }
  }
  if (req.params) sanitizeObject(req.params);
  next();
};

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(customSanitizer);

// Routes
const userAuthRoutes = require("./routes/userAuth.js");
const adminAuthRoutes = require("./routes/adminAuth.js");

// Database Connection
main().catch((err) => console.log(err));

async function main() {
  const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CampusConnect";
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
  await seedSuperAdmin();
}

// Validation Middleware
const validateListing = (req, res, next) => {
  if (req.body.event && req.body.event.tags && typeof req.body.event.tags === 'string') {
    req.body.event.tags = req.body.event.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }

  let { error } = eventSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// --- API Routes ---

app.use("/api/users", userAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

// Dashboard Stats (Admin Only)
app.get(
  "/api/stats",
  verifyAdminToken,
  wrapAsync(async (req, res) => {
    const [eventCount, userCount, adminCount, faqCount] = await Promise.all([
      Event.countDocuments({}),
      User.countDocuments({}),
      Admin.countDocuments({}),
      Faq.countDocuments({}),
    ]);
    
    res.json({ 
      success: true,
      stats: {
        events: eventCount,
        users: userCount,
        admins: adminCount,
        faqs: faqCount
      }
    });
  }),
);

// Events API
app.get("/api/events", wrapAsync(async (req, res) => {
  let allEvents = await Event.find({}).sort({ createdAt: -1 });
  res.json(allEvents);
}));

app.post("/api/events", verifyAdminToken, validateListing, wrapAsync(async (req, res) => {
  const newEvent = new Event(req.body.event);
  await newEvent.save();
  res.status(201).json(newEvent);
}));

// GET Event (Update populate to include author)
app.get("/api/events/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  
  // Populate FAQs and the Author inside the FAQ
  let event = await Event.findById(id).populate({
    path: "faqs",
    populate: { path: "author", select: "username" } 
  });
  
  if (!event) throw new ExpressError(404, "Event not found");

  let similarEvents = await Event.find({
    _id: { $ne: event._id },
    type: event.type,
    tags: { $in: event.tags },
  }).limit(3);

  if (similarEvents.length === 0) {
    similarEvents = await Event.find({ _id: { $ne: id }, tags: { $in: event.tags } }).limit(3);
  }
  res.json({ event, similarEvents });
}));

app.put("/api/events/:id", verifyAdminToken, validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let updatedEvent = await Event.findByIdAndUpdate(id, { ...req.body.event }, { new: true });
  res.json(updatedEvent);
}));

app.delete("/api/events/:id", verifyAdminToken, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.json({ message: "Event Deleted Successfully" });
}));

// POST FAQ (Add author mapping)
app.post("/api/events/:id/faqs", isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let event = await Event.findById(id);
  if (!event) throw new ExpressError(404, "Event not found");

  let newFaq = new Faq({
    question: req.body.question,
    event: event._id,
    author: req.user.id // Assign the logged-in user as the author
  });
  
  event.faqs.push(newFaq);
  await newFaq.save();
  await event.save();
  res.status(201).json(newFaq);
}));

// ADD NEW ROUTE: DELETE FAQ
app.delete("/api/events/:eventId/faqs/:faqId", isLoggedIn, wrapAsync(async (req, res) => {
  let { eventId, faqId } = req.params;

  const faq = await Faq.findById(faqId);
  if (!faq) throw new ExpressError(404, "FAQ not found");

  // Check Permissions
  const isAdmin = req.admin && (req.admin.role === 'admin' || req.admin.role === 'super-admin');
  const isAuthor = req.user && faq.author && req.user.id === faq.author.toString();

  if (!isAdmin && !isAuthor) {
     throw new ExpressError(403, "Not authorized to delete this question");
  }

  // Remove FAQ reference from the Event array
  await Event.findByIdAndUpdate(eventId, { $pull: { faqs: faqId } });
  
  // Delete the actual FAQ document
  await Faq.findByIdAndDelete(faqId);

  res.json({ success: true, message: "Question deleted successfully" });
}));

app.all("*path", (req, res, next) => {
  next(new ExpressError(404, "API endpoint not found"));
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("API Server is listening on port 3000");
});