const express = require('express');

const port = 3000;

const bodyParser = require('body-parser');

const app = express();


/**
 * CORS headers
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/', (req, res, next) => {
    res.send("wtf");
});


app.listen(port);