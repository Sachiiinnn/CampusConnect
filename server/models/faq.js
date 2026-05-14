// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const faqSchema = new Schema({
//     question: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     // author: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User',
//     //     required: true
//     // },
//     event: {
//         type: Schema.Types.ObjectId,
//         ref: 'Event',
//         required: true
//     },
//     replies: [
//         {
//             body: String,
//             // author: {
//             //     type: Schema.Types.ObjectId,
//             //     ref: 'User'
//             // },
//             // isOrganizer: {
//             //     type: Boolean,
//             //     default: false
//             // },
//             // createdAt: {
//             //     type: Date,
//             //     default: Date.now
//             // }
//         }
//     ],
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model("FAQ", faqSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false, // false so old data doesn't break, but new questions will have an author
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  replies: [
    {
      body: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FAQ", faqSchema);
