# 🎓 AI-Enhanced Event Aggregation and Recommendation Portal (Campus Connect)

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Vite-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-Express-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-darkgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
</p>

---

# 📖 Overview

**Campus Connect** is an AI-enhanced centralized event aggregation and recommendation portal developed to improve communication and engagement within academic institutions. The platform provides students with a unified interface to discover campus opportunities such as hackathons, workshops, seminars, internships, and cultural events.

The system solves the problem of fragmented event communication by consolidating all event-related information into one intelligent platform powered by recommendation-driven logic and secure role-based access management.

---

# 🏛️ Academic Information

| Field | Details |
|---|---|
| **Project Title** | AI-Enhanced Event Aggregation and Recommendation Portal |
| **Project Name** | Campus Connect |
| **Degree** | Bachelor of Technology (B.Tech) |
| **Branch** | Computer Science and Engineering |
| **Academic Session** | 2025 – 2026 |
| **Institution** | Greater Noida Institute of Technology (GNIT), GGSIPU |
| **Project Guide** | Md. Shahrookh Husain (Assistant Professor) |

---

# 👨‍💻 Team Members

| Name | Role |
|---|---|
| Sachin | Team Leader |
| Richa Chaudhary | Team Member |
| Ayush Sareen | Team Member |

---

# 📌 Problem Statement

In modern academic institutions, event-related communication is often highly fragmented across multiple channels such as:

- WhatsApp groups
- Email announcements
- Physical notice boards
- Telegram groups
- Social media posts

As a result:

- Students frequently miss valuable opportunities.
- Organizers struggle to reach the right audience.
- Participation rates remain low.
- Campus engagement becomes inefficient.

There is a significant need for a centralized intelligent platform that aggregates opportunities and recommends relevant events to students based on their interests and academic profiles.

---

# 🎯 Objectives

The primary objectives of Campus Connect are:

- Develop a centralized event management platform.
- Provide AI-enhanced event recommendations.
- Improve visibility of academic and extracurricular opportunities.
- Enable efficient event management for organizers.
- Simplify student-event interaction.
- Implement secure authentication and authorization.
- Create a scalable MERN-based architecture.

---

# 🚀 Key Features

## 👨‍🎓 Student Features

- Browse upcoming campus events.
- Explore hackathons, workshops, internships, and seminars.
- View detailed event information.
- Ask questions in event FAQs.
- Delete self-posted questions.
- Generate professional LinkedIn event participation posts.
- Receive personalized event recommendations.

---

## 👨‍💼 Admin Features

- Create new event postings.
- Edit and update event details.
- Delete outdated or invalid events.
- Moderate FAQ discussions.
- Access analytics dashboard.
- Manage community engagement.

---

## 👑 Super Admin Features

- Create new admin accounts.
- Manage organizer access.
- Control platform-level administration.
- Maintain accountability tracking.

---

# 🧠 AI-Enhanced Recommendation System

Campus Connect incorporates intelligent recommendation logic to improve event discoverability.

The recommendation mechanism considers:

- User interests
- Skills and technologies
- Academic profile
- Event tags and categories
- Previous interactions

This improves:

- User engagement
- Participation rates
- Event relevance
- Opportunity accessibility

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend Framework |
| Vite | Development Environment |
| React Router DOM v6 | Routing |
| Context API | State Management |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Sonner | Notifications |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MVC Architecture | Project Structure |
| Helmet | Security Headers |
| Express Rate Limit | DDoS Protection |
| Custom Sanitizer | NoSQL Injection Prevention |

---

## Database

| Technology | Purpose |
|---|---|
| MongoDB | Database |
| Mongoose | ODM |

---

## Authentication & Security

| Technology | Purpose |
|---|---|
| JWT | Authentication |
| bcryptjs | Password Hashing |
| RBAC | Role-Based Access Control |

---

# 🏗️ System Architecture

## High-Level Architecture

```text
+-------------------+
|   React Frontend  |
|  (Client Layer)   |
+---------+---------+
          |
          | REST API Calls
          v
+-------------------+
| Express Backend   |
| (Server Layer)    |
+---------+---------+
          |
          | Mongoose ODM
          v
+-------------------+
|    MongoDB DB     |
|   (Data Layer)    |
+-------------------+
```

---

# 📂 Database Collections

## 1. Users Collection

Stores:

- Student credentials
- User profiles
- Skills and interests
- Authentication data

---

## 2. Admins Collection

Stores:

- Admin credentials
- Roles (`admin`, `super-admin`)
- Creator tracking

---

## 3. Events Collection

Stores:

- Event title
- Description
- Tags
- Images
- Deadlines
- Venue information
- FAQ references

---

## 4. FAQs Collection

Stores:

- User-generated questions
- Event references
- User references

---

# 🔐 Authentication Flow

```text
User Login/Register
        |
        v
Password Hashing (bcryptjs)
        |
        v
JWT Token Generation
        |
        v
Token Verification Middleware
        |
        v
Protected Routes Access
```

---

# 📁 Project Structure

```bash
CampusConnect/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── init/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup Guide

## 📋 Prerequisites

Ensure the following software is installed:

- Node.js v16 or above
- MongoDB (Local or Atlas)
- npm or yarn

---

# 📥 Step 1: Get the Source Code

## Option A: Using ZIP File

1. Locate the provided `CampusConnect.zip`.
2. Extract the archive.
3. Open terminal inside the extracted folder.

```bash
cd path/to/CampusConnect
```

---

## Option B: Clone from GitHub

```bash
git clone https://github.com/sachiiinnn/CampusConnect.git

cd CampusConnect
```

---

# 🔑 Step 2: Configure Environment Variables

## Backend Environment Variables

Create:

```bash
server/.env
```

Add the following:

```env
PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017/CampusConnect

JWT_USER_SECRET=your_super_secret_user_key_here

JWT_ADMIN_SECRET=your_super_secret_admin_key_here
```

---

## Frontend Environment Variables

Create:

```bash
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:3000/api
```

---

# 🖥️ Step 3: Backend Setup

Navigate to server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Run backend server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

---

# 🌐 Step 4: Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start Vite server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🗄️ Step 5: Initialize Sample Database

To populate sample events:

```bash
cd server

node init/index.js
```

This inserts sample event data into MongoDB.

---

# 👑 Default Super Admin Seeder

On first startup, the backend automatically checks whether a super-admin account exists.

If none exists, the system provisions one automatically using the seeder script.

---

# 🔒 Security Features

Campus Connect includes several security enhancements:

- JWT-based authentication
- Role-based authorization
- Password hashing using bcryptjs
- NoSQL injection sanitization
- HTTP security headers via Helmet
- API rate limiting
- Protected admin routes

---

# 📊 Admin Dashboard Metrics

The dashboard provides:

- Total users
- Total admins
- Total events
- Total FAQs
- Platform activity monitoring

---

# 📱 Responsive Design

The platform is fully responsive and optimized for:

- Desktop devices
- Tablets
- Mobile phones

Built using:

- Tailwind CSS
- Responsive utility classes
- Modern component architecture

---

# 🔄 Event Workflow

```text
Admin Creates Event
        |
        v
Event Stored in MongoDB
        |
        v
Students Browse Events
        |
        v
Students Ask Questions
        |
        v
Admins Moderate FAQs
        |
        v
Students Share Participation
```

---

# 🌟 Future Enhancements

Potential future improvements include:

- AI chatbot assistant
- Email notifications
- Event bookmarking
- Real-time chat system
- Push notifications
- AI-powered resume matching
- Event recommendation ML model
- Attendance tracking
- Calendar integrations
- Mobile application support

---

# 🧪 Testing Recommendations

Recommended testing approaches:

- API testing using Postman
- Unit testing with Jest
- Frontend testing with React Testing Library
- MongoDB schema validation testing
- Authentication testing

---

# ☁️ Deployment

## Frontend Deployment

Recommended platforms:

- Vercel
- Netlify

---

## Backend Deployment

Recommended platforms:

- Render
- Railway
- Cyclic

---

## Database Hosting

Recommended:

- MongoDB Atlas

---

# 📸 Suggested Screenshots for Documentation

Add screenshots for:

- Login Page
- Dashboard
- Event Feed
- Event Details Page
- FAQ Section
- Admin Dashboard
- Create Event Page
- LinkedIn Post Generator

---

# 📚 Learning Outcomes

Through this project, the team gained experience in:

- Full Stack MERN Development
- Authentication & Security
- Role-Based Access Control
- REST API Development
- MongoDB Database Design
- Frontend State Management
- Deployment Strategies
- Academic Project Documentation

---

# 🤝 Contribution Guidelines

To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

---

# 📄 License

This project is developed for academic and educational purposes under the B.Tech Final Year Project curriculum.

---

# 🙏 Acknowledgements

We sincerely thank:

- Greater Noida Institute of Technology (GNIT)
- Guru Gobind Singh Indraprastha University (GGSIPU)
- Project Guide: Md. Shahrookh Husain
- Faculty members and peers for their continuous support

---

# 📬 Contact

For queries or collaborations:

- Project Team: Campus Connect Developers
- Institution: Greater Noida Institute of Technology (GNIT)

---

<p align="center">
  <b>Campus Connect — Bridging Students with Opportunities Through AI 🚀</b>
</p>