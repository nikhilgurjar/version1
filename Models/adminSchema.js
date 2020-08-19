const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    required: true,
  },
  phone: {
    type: Number,
    minlength: 4,
    required: true,
  },
  email: {
    type: String,
    minlength: 10,
    required: true,
  },
  password:{
    type:String,
    required:true
  }
});

mongoose.model("Admin", adminSchema);

module.exports = adminSchema
