const express = require('express');
const { auth } = require('../middleware/auth');
const { getMenu, addOne, removeOne, editOne } = require('../controllers/menuController');
const router = express.Router();

router.get('/', auth, getMenu);
router.post('/add', auth, addOne);
router.post('/remove/:id', auth, removeOne);
router.put('/edit/:id', auth, editOne)

module.exports = router;