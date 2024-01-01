const express = require('express');
const app = express();
const cors = require('cors');
const mongoose=require("mongoose");
const favRouter = require('./routes/fav.router');
const searchRouter = require('./routes/search.router');
const loginRouter = require('./routes/login.route')
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

app.use('/fav', favRouter);
app.use('/search', searchRouter);
app.use('/login',loginRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});