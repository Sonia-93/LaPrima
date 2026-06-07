const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer');

router.get('/customers', controller.getCustomers);
router.post('/customers', controller.addCustomer);
router.put('/customers/:id', controller.updateCustomer);
router.delete('/customers/:id', controller.deleteCustomer);

module.exports = router;
