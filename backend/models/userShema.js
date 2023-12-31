const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      default:"https://www.bing.com/th?id=OIP.1QE_bLwBgy4tLarLPJYrEAHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const schemaProduct =new mongoose.Schema({
  name:String ,
  category:String,
  image:String,
  price:String,
  description:String
})
const Product = mongoose.model("Product", schemaProduct);

const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports = Product;