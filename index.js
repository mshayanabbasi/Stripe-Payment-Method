const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const stripeRouter = require("./routes/stripe");

dotenv.config();

const app = express();

//MiddleWares
app.use(express.json({ extended: false }));

//enable CORS for all routes
const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Routes
app.use("/api/stripe", cors(corsOptions), stripeRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});