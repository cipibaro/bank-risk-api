const express = require('express');

const port = 3000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const clientRoutes = require('./routes/client');

const app = express();


// Define a Client class with attributes
class Client {
    constructor(name, income, creditScore, outstandingDebt) {
        this.name = name;
        this.income = income;
        this.creditScore = creditScore;
        this.outstandingDebt = outstandingDebt;
    }
}

// Function to calculate the lower approximation set of creditworthy clients
function lowerApproximation(clients, minIncome, minCreditScore, maxOutstandingDebt) {
    return clients.filter(
        (client) =>
            client.income >= minIncome &&
            client.creditScore >= minCreditScore &&
            client.outstandingDebt <= maxOutstandingDebt
    );
}

// Function to calculate the upper approximation set of creditworthy clients
function upperApproximation(clients, minIncome, minCreditScore, maxOutstandingDebt) {
    const upperApprox = [];
    const uniqueClients = new Set(clients);

    clients.forEach((client) => {
        if (
            client.income >= minIncome ||
            client.creditScore >= minCreditScore ||
            client.outstandingDebt <= maxOutstandingDebt
        ) {
            upperApprox.push(client);
            uniqueClients.delete(client);
        }
    });

    return upperApprox.concat([...uniqueClients]);
}

// Main function
function main() {
    const clients = [
        new Client("John", 50000, 700, 1000),
        new Client("Jane", 45000, 680, 8000),
        new Client("Mike", 60000, 720, 500),
        new Client("Emily", 52000, 690, 1500),
        new Client("David", 48000, 650, 3000),
        new Client("Sarah", 58000, 710, 200),
    ];

    const minIncome = 55000;
    const minCreditScore = 700;
    const maxOutstandingDebt = 2000;

    console.log("Creditworthy clients (Lower Approximation):");
    const lowerApprox = lowerApproximation(clients, minIncome, minCreditScore, maxOutstandingDebt);
    lowerApprox.forEach((client) => console.log(client.name));

    console.log("Possible creditworthy clients (Upper Approximation):");
    const upperApprox = upperApproximation(clients, minIncome, minCreditScore, maxOutstandingDebt);
    upperApprox.forEach((client) => console.log(client.name));
}

// Run the main function
main();


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