const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handler");
require("./model");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

// const PORT = process.env.PORT || 5000
const PORT = 6001;

// Use router middleware
app.use("/api", router);

// Use a middleware to handle server errors uniformly
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
