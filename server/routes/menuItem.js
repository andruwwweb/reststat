const express = require('express');
const { auth } = require('../middleware/auth');
const { createMenuItem, deleteMenuItem, editMenuItem, getMenuItem } = require('../controllers/menuItemController.js');
const router = express.Router();

router.post('/create', auth, createMenuItem);
router.patch('/edit/:id', auth, editMenuItem);
router.delete('/delete/:id', auth, deleteMenuItem);
router.get('/all', getMenuItem);



module.exports = router;