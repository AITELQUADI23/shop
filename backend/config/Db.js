const mongoose = require("mongoose");


module.exports = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce",{});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};



