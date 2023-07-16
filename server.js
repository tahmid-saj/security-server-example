const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.post("/secret", (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);

  if (userInput) {
    res.status(200).json("success");
  } else {
    res.status(400).json("incorrect submission");
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})