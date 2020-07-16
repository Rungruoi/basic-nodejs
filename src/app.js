const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// connection to db
mongoose.connect(process.env.MONGO_DB)
  .then(db => console.log('db connected true'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
// importing routes
const indexRoutes = require('./routes/index');

// settings
const port =  process.env.PORT;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`server on port` + port);
});
