const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const port = 8080;
//1uPS404twRFEkmMz -pwd

// registering user schema
require("../models/user");
//parse data to json(define it before route as than it will parse it to json befor goint in router)
app.use(express.json());
// registering router
app.use(require("../routes/auth"));
mongoose.connect(MONGOURI, { useNewUrlParser: true });
// for successfull connection
mongoose.connection.on("connected", () => {
  console.log("Keep going....");
});
// for unsuccessfull connection
mongoose.connection.on("error", (err) => {
  console.log("Oh no error:", err);
});
app.listen(port, () => {
  console.log("GAME ON");
});
