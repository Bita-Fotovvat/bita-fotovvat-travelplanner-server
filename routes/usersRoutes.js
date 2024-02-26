const jwt = require("jsonwebtoken");
const fs = require("fs");
const router = require('express').Router();
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const usersController = require('../controllers/usersController');
router.use(cors());

const users = JSON.parse(fs.readFileSync("./data/users.json"));
const getUser = (username) => users.find((user) => user.username === username);
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (!!user && user.password === password) {
    const token = jwt.sign(
      { userid: user.id, username: user.username, name: user.name, email: user.email },
      process.env.SECRET_KEY
    );
    res.json({ token: token  ,
        userid: user.id });
  } else {
      res.status(401).json({
      message: 'The password or username is incorrect.'
      });
  }
});
router.get(
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
    console.log(req.payload)
  }
);
router.route("/:id").get(usersController.findOne);
router.get("/:id/saveditems", usersController.savedFavs);

module.exports = router;