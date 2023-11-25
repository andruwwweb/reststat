const express = require('express');
const { auth } = require('../middleware/auth');
const { createCompany, editCompany } = require('../controllers/companyController');
const router = express.Router();

router.post('/create', auth, createCompany);
router.patch('/edit', auth, editCompany);

module.exports = router;