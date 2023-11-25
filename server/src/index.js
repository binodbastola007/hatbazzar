const express = require('express');
const mongoose = require('mongoose');
const connection = require('./db/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const userRoute = require('./routes/user');
const productRoute = require('./routes/products');
const cors = require('cors');
const port = 4000;

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(userRoute);
app.use(productRoute);

connection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})