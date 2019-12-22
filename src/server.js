import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "@babel/polyfill/noConflict";
const app = express();
// Import Routes
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";

dotenv.config();

// connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

// Middleware for bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use(express.json());

// Routes Middleware
app.use("/api/v1/user", authRoute);
app.use("/api/v1/posts", postRoute);

// Setup server port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Up and running ${port}`);
});
// module.exports = app;
export default app;
