const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

require("dotenv").config();

// Pass express() to app
const app = express();

// Declare port
const port = process.env.PORT || 1960;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Pull the mongoose connection address
const uri = process.env.MONGODB_URI;

// Establish connection to mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(Date() + ` Database connection established!`);
});

// Display welcome page!

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Building Routes

// Routes for products
const productsRouter = require("./routes/products");

// Routes for users
const usersRouter = require("./routes/users");

// Build address routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

// Use Morgan for logging
app.use(
  morgan(
    ":date[web] :method :url :status :res[content-length] - :response-time ms"
  )
);

app.listen(port, () => {
  console.log(Date() + ` Server running on port: ${port}`);
});
