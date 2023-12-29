const express = require('express');
const { login, registration } = require('../controllers/authorizeController');
const router = express.Router();

/**
 * @swagger
 * /api/authorize/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     tags:
 *       - Authorize
 *     parameters:
 *       - in: body
 *         name: LoginData
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: "user@post.com"
 *               name: "User Name"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               case1:
 *                 value:
 *                   message: 'Заполните данные для входа'
 *               case2:
 *                 value:
 *                   message: 'Неверно введен email или пароль'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/login', login);

/**
 * @swagger
 * /api/authorize/registration:
 *   post:
 *     summary: User registration
 *     description: Endpoint for user registration.
 *     tags:
 *       - Authorize
 *     parameters:
 *       - in: body
 *         name: RegisterData
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               role: 'owner'
 *               email: "user@post.com"
 *               name: "User Name"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               case1:
 *                 value:
 *                   message: 'Заполните указанные поля.'
 *               case2:
 *                 value:
 *                   message: 'Введите корректный email адрес.'
 *               case3:
 *                 value:
 *                   message: 'Пользователь с таким email уже существует'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/registration', registration);

module.exports = router;