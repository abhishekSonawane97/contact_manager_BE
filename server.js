const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const errorHnadler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
// const bodyParser = require('body-parser');
connectDb();
const app = express();

const port = process.env.PORT || 5000;
// const port = 5000

app.use(express.json());
app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoute);
app.use( errorHnadler );

app.listen(port, () => {
  console.log("server running on port : ", port);
});
