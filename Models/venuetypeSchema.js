const mongoose = require("mongoose");
const types = ["gym", "cafe", "mall", "hospital"];

const venuetypeSchema = new mongoose.Schema({
  venuetype: { types },
});

mongoose.model("Venuetype", venuetypeSchema);

module.exports = venuetypeSchema;
