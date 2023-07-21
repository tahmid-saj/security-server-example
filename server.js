const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const winston = require("winston");
const helmet = require("helmet");

const whitelist = ["http://example2.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.cookie('session', '1', { httpOnly: true });
  res.cookie('session', '1', { secure: true });
  res.set({
    'Content-Security-Policy': "script -src 'self' 'https://apis.google.com'",
  })

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