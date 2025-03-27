const express = require("express");
const cors = require("cors");
require("dotenv").config();
import accRoute from "./route/accRoute.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/account", accRoute);

require("./config/dnConn");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
