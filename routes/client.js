const express = require('express');

const clientController = require('../controllers/client');

const router = express.Router();


router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', clientController.postClients);
router.patch('/clients/:id', clientController.patchClients);




module.exports = router;

