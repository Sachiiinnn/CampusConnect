const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {
        type : String,
        minlength : 5,
        maxlength : 100,
        required : true,
        trim : true 
    },
    type :{
        type : String,
        required : true,
        enum : ['Hackathon', 'Internship', 'Fest', 'Workshop'],
        default: 'Hackathon' // Note: Matched case with enum
    },
    organizer : {
        type : String,
        required : true,
    },
    mode : {
        type : String,
        enum : ['Online', 'Offline', 'Hybrid'],
        default : 'Online'
    },
    location : {
        type : String,
        default : 'Delhi-NCR'
    },
    deadline : {
        type : Date,
        required : true,
    },
    applyLink :{
        type : String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
    tags : [String],
    imageURL : {
        type : String,
        default : 'https://plus.unsplash.com/premium_photo-1681400688788-a5fd7e7bcd89?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    faqs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FAQ'
        }
    ],
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);