const express = require('express');
const { auth } = require('../middleware/auth');
const { createCompany, editCompany, deleteCompany } = require('../controllers/companyController');
const router = express.Router();

router.post('/create', auth, createCompany);
router.patch('/edit/:id', auth, editCompany);
router.delete('/delete/:id', auth, deleteCompany);

module.exports = router;