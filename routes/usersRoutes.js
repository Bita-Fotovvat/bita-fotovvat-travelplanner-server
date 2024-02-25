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
//todo
const getUser = (username) => users.find((user) => user.username === username);

// router.post("/signup", (req, res) => {
//   // grab the username/password
//   // populate the user into some persistent thing
//   users.push(req.body);
//   res.json({ success: true });
// });

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  // grab the user that matches the username in the request
  const user = getUser(username);

  console.log(user)
  // check the password matches the password in the request
  if (!!user && user.password === password) {
    // generate a token and send it back
    const token = jwt.sign(
      { userid: user.id, username: user.username, name: user.name, email: user.email },
      process.env.SECRET_KEY
    );
    res.json({ token: token  ,
        userid: user.id });
  } else {
    // send error message + status code
    res.status(401).json({
      message: 'The password or username is incorrect.'
    });
  }
});

router.get(
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


router.route("/:id").get(usersController.findOne);
// router.route("/:id/saveditems").get(usersController.savedFavs);
router.get("/:id/saveditems", usersController.savedFavs);
// app.listen(port, () => {
//   console.log(`Express listening on port ${port}`);
// });


// const express = require("express");
// const router = express.Router();
// const fs = require("fs/promises");
// const { toUnicode } = require("punycode");
// const fs2 = require("fs");
// const { v4 } = require("uuid");

// const pathWarehouses = "./data/warehouses.json";
// const pathInventory = "./data/inventories.json";

// /**
//  *
//  * GET 1 USER BY ID
//  *
//  */
// router.get("/:id", (req, res) => {
//     fs.readFile(pathWarehouses, "utf-8")
//       .then((data) => {
//         const warehousesArray = JSON.parse(data);
  
//         // find the warehouse with params id
//         const foundWarehouse = warehousesArray.filter(
//           (warehouse) => warehouse.id === req.params.id
//         );
  
//         // If warehouse not found, filter returns an empty array. Evaluate this condition.
//         if (foundWarehouse.length > 0) {
//           const warehouse = foundWarehouse[0];
  
//           res.status(200).send(JSON.stringify(warehouse));
//         } else if (foundWarehouse.length === 0) {
//           res.status(400).json({
//             "request error": `No warehouse with the id of ${req.params.id}`,
//           });
//         }
//       })
//       .catch((err) => {
//         res.status(400).send("error reading warehouse file");
//       });
//   });
  
//   /**
//    *
//    *  GET WAREHOUSE BY ID + ALL CORRESPONDING INVENTORY ITEMS
//    *
//    */
//   router.get("/:id/withinventory", (req, res) => {
//     fs.readFile(pathWarehouses, "utf-8")
//       .then((data) => {
//         const warehousesArray = JSON.parse(data);
  
//         // find the warehouse with params id
//         const foundWarehouse = warehousesArray.filter(
//           (warehouse) => warehouse.id === req.params.id
//         );
  
//         // If warehouse not found, filter returns an empty array. Evaluate this condition.
//         if (foundWarehouse.length > 0) {
//           // const mergedArray = [...foundWarehouse];
//           const inventories = [];
  
//           const warehouse = foundWarehouse[0];
  
//           // Read inventory files
//           fs.readFile(pathInventory, "utf-8").then((inventoryData) => {
//             // parse json string to array
//             const inventoriesArray = JSON.parse(inventoryData);
  
//             // push every warehouse inventory item into mergedArray
//             inventoriesArray.forEach((inventory) => {
//               if (inventory.warehouseID === warehouse.id) {
//                 inventories.push(inventory);
//               }
//             });
  
//             res.status(200).send(JSON.stringify({ warehouse, inventories }));
//           });
//         } else if (foundWarehouse.length === 0) {
//           res.status(400).json({
//             "request error": `No warehouse with the id of ${req.params.id}`,
//           });
//         }
//       })
//       .catch((err) => {
//         res.status(400).send("error reading warehouse file");
//       });
//   });
  




module.exports = router;