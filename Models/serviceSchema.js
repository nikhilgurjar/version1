const mongoose = require("mongoose");
const services = ["longterm", "shortterm"];

const serviceSchema = new mongoose.Schema({
  servicetype: { services },
});

mongoose.model("Services", serviceSchema);

module.exports = serviceSchema;
