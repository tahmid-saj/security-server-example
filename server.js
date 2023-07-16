const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const winston = require("winston");

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.post("/secret", (req, res) => {
  const { userInput } = req.body;
  
  if (userInput) {
    winston.log('info', userInput);
    res.status(200).json("success");
  } else {
    winston.error("this guy is messing with us");
    res.status(400).json("incorrect submission");
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})