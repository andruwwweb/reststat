const express = require('express');
const { auth } = require('../middleware/auth');
const { createEmployee, deleteEmployee } = require('../controllers/employeeController.js');
const router = express.Router();

router.post('/create', auth, createEmployee);
router.delete('/delete/:id', auth, deleteEmployee);

module.exports = router;