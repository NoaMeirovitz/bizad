const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routers/auth-router");
const businessesRoutes = require("./routers/businesses-routes");

const app = express();

// allows us to send request from fe to server
app.use(cors());
// parse the body of the request (req.body)
app.use(express.json());
// parse the cookies of the request (req.cookies)

app.use("/auth", authRoutes);
app.use("/businesses", businessesRoutes);

(async function () {
  mongoose.connection.once("open", () => console.log("connected to mongoDB"));
  mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.jwbxlth.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
})().catch((err) => console.log(err));

module.exports = app;
