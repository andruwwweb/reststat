const express = require('express');
const { createOrder, getOrder, deleteOrder, getAllOrders } = require('../controllers/orderController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.post('/create', auth, createOrder);
router.get('/get/:id', auth, getOrder);
router.get('/all', auth, getAllOrders);


module.exports = router;