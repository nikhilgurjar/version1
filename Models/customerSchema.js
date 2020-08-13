const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const customerSchema = new mongoose.Schema({
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
  city: {
    type: String,
    minlength: 4,
    required: true,
  },
  addedby: {
    type: String,
    ref: "Distributor",
  },
  venuetype: {
    type: String,
    ref: "",
  },
});

mongoose.model("Customer", customerSchema);

module.exports = customerSchema;
