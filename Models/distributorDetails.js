const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const distributorSchema = new mongoose.Schema({
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
  enabledservices:{
    type:String
  },
  // [{ type: ObjectId, ref: "" }]
});

mongoose.model("Distributor", distributorSchema);

module.exports = distributorSchema;
