'use strict';

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('dotenv').config();
const app = express();
if (process.env.NODE_ENV === 'test')
    mongoose.connect(process.env.MONGODB_URI_TEST);
else
    mongoose.connect(process.env.MONGODB_URI);

const port = process.env.PORT;

const cors = require('cors');
const bodyParser = require('body-parser');

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routes')(app);

app.listen(port, () => {
    console.log('Club API is live @ Port: ' + port);
});

module.exports = app;