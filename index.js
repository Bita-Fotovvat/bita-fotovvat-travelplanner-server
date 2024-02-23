const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());


const PORT = process.env.SERVER_PORT || 5050;

const savedItemsRoutes = require('./routes/savedItemsRoutes'); 
const usersRoutes = require('./routes/usersRoutes');

app.get('/', (_req, res)=>{
    res.send('Hi welcome!')
});

app.use('/users', usersRoutes);
app.use('/saveditems', savedItemsRoutes);

app.listen(PORT, () => {
    console.log(PORT);
    console.log(`running at http://localhost:${PORT}`);
  });
