const Client = require('../models/client');
const mongoose = require('mongoose');

/**
 * Gets all the clients from database
 * @param req
 * @param res
 * @param next
 */
exports.getClients = (req, res, next) => {
   res.status(200).send('sadasdas');
}


/**
 * Add client
 * @param req
 * @param res
 * @param next
 */
exports.postClients = (req, res, next) => {


    const client =  new Client({
       _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName:req.body.lastName,
    });

    client.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'Client create Successfully',
        addedClient: client
    });
}

/**
 * Edit one client
 * @param req
 * @param res
 * @param next
 */
exports.patchClients = (req, res, next) => {
    const id = req.params.id




    res.status(201).json({
        message: 'Client updated Successfully',

    });
}

/**
 * Delete one client
 * @param req
 * @param res
 * @param next
 */
exports.deleteClients = (req, res, next) => {
    res.status(201).json({
        message: 'Client delete Successfully'
    });
}


