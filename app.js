const express = require("express");
const app = express();
require("dotenv").config();
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
app.use(logger("dev"));
//module.exports= router = express.Router(); tried for global but dont know

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});
require("./models/distributorDetails");
require("./models/customerSchema");
require("./models/venueSchema");
require("./models/venuetypeSchema");
require("./models/serviceSchema");

require("./models/adminSchema");

app.use("/", require('./routes/index'));
app.use("/distributor",require('./routes/distributorsash'));
app.use("/admin",require('./routes/admindash'));

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
