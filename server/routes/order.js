const express = require('express');
const { createOrder, getOrder, deleteOrder, getAllOrders } = require('../controllers/orderController');
const { auth } = require('../middleware/auth')
const router = express.Router();

/**
 * @swagger
 * /api/order/create:
 *   post:
 *     summary: Create an order
 *     description: Endpoint for creating a new order.
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: Menu item details
 *         description: Menu item details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             orderItems:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   menuItemId:
 *                     type: number
 *                   amount:
 *                     type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 amount: 2
 *                 menuItemId: 1
 *                 orderId: 1
 *               - id: 2
 *                 amount: 1
 *                 menuItemId: 2
 *                 orderId: 1
 *       400:
 *         description: Not Found
 *         content:
 *           application/json:
 *             examples:
 *               case1:
 *                 value:
 *                   message: 'Не удалось найти позицию меню по переданным параметрам при создании заказа!'
 *               case2:
 *                 value:
 *                   message: 'Не удалось создать заказ, попробуйте снова!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/create', auth, createOrder);

/**
 * @swagger
 * /api/order/get/{id}:
 *   get:
 *     summary: Get an order
 *     description: Endpoint for retrieving details of a specific order.
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: ID of the order to retrieve
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               companyId: 1
 *               createdAt: "2023-01-01T12:00:00.000Z"
 *               menuItems:
 *                 - id: 1
 *                   amount: 2
 *                   menuItemId: 1
 *                   orderId: 1
 *                   itemInformation:
 *                     price: 1900
 *                     caption: "Menu Item 1"
 *                     description: "Description of Menu Item 1"
 *                 - id: 2
 *                   amount: 1
 *                   menuItemId: 2
 *                   orderId: 1
 *                   itemInformation:
 *                     price: 990
 *                     caption: "Menu Item 2"
 *                     description: "Description of Menu Item 2"
 *       400:
 *         description: Not Found
 *         content:
 *           application/json:
 *             examples:
 *               case1:
 *                 value:
 *                   message: 'Не удалоль найти заказ по переданным парметрам!'
 *               case2:
 *                 value:
 *                   message: 'Не удалоль найти данные для выбранного заказа!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.get('/get/:id', auth, getOrder);

/**
 * @swagger
 * /api/order/getAll:
 *   get:
 *     summary: Get all orders
 *     description: Endpoint for retrieving details of all orders for a specific company
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Number of orders to retrieve (default is 10)
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *           default: 10
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 companyId: 1
 *                 createdAt: "2023-01-01T12:00:00.000Z"
 *                 payed: true
 *               - id: 2
 *                 companyId: 1
 *                 createdAt: "2023-01-03T10:00:00.000Z"
 *                 payed: true
 *               - id: 3
 *                 companyId: 1
 *                 createdAt: "2023-01-05T15:30:00.000Z"
 *                 payed: false
 *       400:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти данные заказов для выбранной компании!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.get('/all', auth, getAllOrders);


/**
 * @swagger
 * /api/order/delete/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Endpoint for deleting an existing order.
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: ID of the order to be deleted
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Заказ успешно удален!'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти заказ по переданным параметрам.'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               message: 'Только администратор имеет права на удаление заказов.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.delete('/delete/:id', auth, deleteOrder);



module.exports = router;