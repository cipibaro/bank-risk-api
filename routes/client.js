const express = require('express');

const clientController = require('../controllers/client');

const router = express.Router();


router.get('/clients', clientController.getClients);
router.post('/clients', clientController.create);
router.delete('/clients', clientController.delete);
router.delete('/clients/:id', clientController.delete);
router.patch('/clients/:id', clientController.update);



module.exports = router;

