const express = require('express');

const clientController = require('../controllers/client');

const router = express.Router();


router.get('/clients', clientController.getClients);
router.post('/clients', clientController.postClients);
router.patch('/clients/:id', clientController.patchClients);
router.delete('/clients/:id', clientController.deleteClients);



module.exports = router;

