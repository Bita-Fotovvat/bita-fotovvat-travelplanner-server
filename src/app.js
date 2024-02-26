const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("dotenv").config();
const app = express();
const port = process.env.PORT ?? 8080;
app.use(cors());
app.use(express.json());
const users = JSON.parse(fs.readFileSync("./data/users.json"));
const getUser = (username) => users.find((user) => user.username === username);
app.post("/signup", (req, res) => {
  users.push(req.body);
  res.json({ success: true });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (!!user && user.password === password) {
    const token = jwt.sign(
      { username: user.username, name: user.name, email: user.email },
      process.env.SECRET_KEY
    );
    res.json({ token });
  } else {
    res.status(401).json({
      message: 'The password or username is incorrect.'
    });
  }
});
app.get(
  "/profile",
  (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorization.slice("Bearer ".length);
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "failed" });
      } else {
        req.payload = payload;
        next();
      }
    });
  },
  (req, res) => {
    res.json(req.payload);
  }
);
app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});