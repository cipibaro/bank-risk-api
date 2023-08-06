const express = require('express');

const port = 3000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const clientRoutes = require('./routes/client');

const app = express();



mongoose.connect('mongodb+srv://ciprian:' + process.env.MONGO_ATLAS_PW + '@cluster0.xnup7rd.mongodb.net/bank-risk-api')
    .then(() => console.log('Connected!'));


/**
 * CORS headers
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(bodyParser.json());
app.use(clientRoutes);


app.get('/', (req, res, next) => {
    res.send("wtf");
});


app.listen(port);