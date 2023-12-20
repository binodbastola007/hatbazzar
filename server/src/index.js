const express = require('express');
const mongoose = require('mongoose');
const connection = require('./db/connection');
require('dotenv').config();
const app = express();
const userRoute = require('./routes/user');
const productRoute = require('./routes/products');
const orderRoute = require('./routes/order');
const esewaRoute = require('./routes/esewa');
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(userRoute);
app.use(productRoute);
app.use(orderRoute);
app.use(esewaRoute);

connection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})