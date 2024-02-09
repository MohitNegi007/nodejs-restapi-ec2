require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/error");

// Connect to DB
connectDB();

// Express App
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/products", (req, res) => {
  return res.status(200).json({
    message: "This is new feature change, a new route for products",
  });
});

app.use("/api/live", (req, res) => {
  // Your HTML code
  const htmlCode =
    "<html><body><h1>Hello, this is HTML response!</h1></body></html>";

  // Send HTML as a response
  res.send(htmlCode);
});

app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
