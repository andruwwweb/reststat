const express = require('express');
const { auth } = require('../middleware/auth');
const { createEmployee, deleteEmployee, getAllEmployees } = require('../controllers/employeeController.js');
const router = express.Router();

/**
 * @swagger
 * /api/employee/create:
 *   post:
 *     summary: Create an employee
 *     description: Endpoint for creating a new employee.
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: body
 *         name: Employee details
 *         description: Employee details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               companyId:
 *                 type: number
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               role: "employee"
 *               email: "employee@example.com"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             examples:
 *               case1:
 *                 value:
 *                   message: 'Заполните данные для создания сотрудника.'
 *               case2:
 *                 value:
 *                   message: 'Введите корректный email адрес.'
 *               case3:
 *                 value:
 *                   message: 'У вас недостаточно прав для создания сотрудника.'
 *               case4:
 *                 value:
 *                   message: 'Сотрудник с таким email уже существует.'
 *               case5:
 *                 value:
 *                   message: 'Неизвестная ошибка, не удалось создать сотрудника.'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'Невалидный авторизационный токен!'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error: 'Недостаточно прав для создания сотрудника!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/create', auth, createEmployee);

/**
 * @swagger
 * /api/employee/all:
 *   get:
 *     summary: Get all employees
 *     description: Endpoint for retrieving all employees for a specific company.
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of employees
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 role: "employee"
 *                 email: "employee1@example.com"
 *               - id: 2
 *                 role: "employee"
 *                 email: "employee2@example.com"
 *               - id: 3
 *                 role: "employee"
 *                 email: "employee3@example.com"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти сотрудников для выбранной компании.'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'Невалидный авторизационный токен!'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error: 'Недостаточно прав для удаления сотрудника!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.get('/all', auth, getAllEmployees);

/**
 * @swagger
 * /api/employee/delete/{id}:
 *   delete:
 *     summary: Delete employee
 *     description: Endpoint for deleting an employee.
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the employee to be deleted
 *         required: true
 *         schema:
 *           type: number
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Employee successfully deleted.'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти сотрудника для удаления по переданным параметрам.'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'Невалидный авторизационный токен!'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error: 'Недостаточно прав для удаления сотрудника!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.delete('/delete/:id', auth, deleteEmployee);


module.exports = router;