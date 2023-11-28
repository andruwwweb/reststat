const express = require('express');
const { auth } = require('../middleware/auth');
const { createEmployee, editEmployee, deleteEmployee } = require('../controllers/employeeController.js');
const router = express.Router();

router.post('/create', auth, createEmployee);
router.patch('/edit/:id', auth, editEmployee);
router.delete('/delete/:id', auth, deleteEmployee);

module.exports = router;