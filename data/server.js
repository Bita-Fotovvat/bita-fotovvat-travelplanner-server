const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 5050;

app.get('/', (req, res)=>{
    res.send('Welcome!')
})

app.listen(PORT, () => {
    console.log(PORT);
    console.log(`running at http://localhost:${PORT}`);
  });
  