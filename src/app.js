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
  // grab the username/password
  // populate the user into some persistent thing
  users.push(req.body);
  res.json({ success: true });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  // grab the user that matches the username in the request
  const user = getUser(username);

  console.log(user)
  // check the password matches the password in the request
  if (!!user && user.password === password) {
    // generate a token and send it back
    const token = jwt.sign(
      { username: user.username, name: user.name, email: user.email },
      process.env.SECRET_KEY
    );
    res.json({ token });
  } else {
    // send error message + status code
    res.status(401).json({
      message: 'The password or username is incorrect.'
    });
  }
});

app.get(
  "/profile",
  // middleware function
  (req, res, next) => {
    // get the token from the Authorization header
    console.log(req.headers);

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // format: 'Bearer eyJhbG...ocLIs'
    const token = authorization.slice("Bearer ".length);

    // verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        // token verification failed: forbidden
        return res.status(401).json({ error: "failed" });
      } else {
        // token verification succeeded: allow access
        // make the token payload available to following handlers
        req.payload = payload;
        next();
      }
    });
  },
  // route handler
  (req, res) => {
    res.json(req.payload);
    console.log(req.payload)
    // setTimeout(() => {
    //   res.json(req.payload);
    // }, 20000);
  }
);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
