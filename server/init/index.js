const mongoose = require('mongoose');
const initData = require('./data');
const Event = require("../models/event");

main().then(res => console.log("Db is connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CampusConnect');
};

const initDb = async() =>{
   await Event.deleteMany({});
   await Event.insertMany(initData.data);
   console.log("data was initialized")
}

initDb();   