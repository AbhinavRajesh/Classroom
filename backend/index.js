const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

const userRouter = require("./routes/users");
const classRouter = require("./routes/class");

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb://127.0.0.1:27017/ar-class";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB Connection Established Successfully!")
);

app.use("/api/user", userRouter);
app.use("/api/class", classRouter);

app.listen(PORT, () => console.log(`Backend Up and running at Port: ${PORT}`));
