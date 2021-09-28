let Fav = require('./favourite.model');
let Search = require('./search.model');
const express = require('express');
const router = require('express').Router();
const app = express();
const cors = require('cors');
const mongoose=require("mongoose");
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const favRouter = require('./fav.router');
const searchRouter = require('./search.router');

app.use('/fav', favRouter);
app.use('/search', searchRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});