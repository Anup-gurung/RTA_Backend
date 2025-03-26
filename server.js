const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

require("./config/dnConn");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
