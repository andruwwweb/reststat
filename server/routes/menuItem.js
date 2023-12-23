const express = require('express');
const { auth } = require('../middleware/auth');
const { createMenuItem, deleteMenuItem, editMenuItem, getMenuItem } = require('../controllers/menuItemController.js');
const router = express.Router();

/**
 * @swagger
 * /api/menuItem/create:
 *   post:
 *     summary: Create a menu item
 *     description: Endpoint for creating a new menu item.
 *     tags:
 *       - MenuItem
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
 *               price:
 *                 type: number
 *               caption:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               price: 10.99
 *               caption: "Example Item"
 *               description: "This is an example menu item."
 *               companyId: 1
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Заполните все поля!'
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
 *               error: 'Недостаточно прав для создания позиции меню!'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/create', auth, createMenuItem);

/**
 * @swagger
 * /api/menuItem/all:
 *   post:
 *     summary: Get all menu items
 *     description: Endpoint for retrieving all menu items for a specific company.
 *     tags:
 *       - MenuItem
 *     parameters:
 *       - in: body
 *         name: Menu item details
 *         description: Menu item details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               companyId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - id: 1
 *                   caption: "Item 1"
 *                   description: "This is item 1."
 *                   price: 9.99
 *                   companyId: 1
 *                 - id: 2
 *                   caption: "Item 2"
 *                   description: "This is item 2."
 *                   price: 12.99
 *                   companyId: 1
 *       400:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти меню указанной компании!'
 *       204:
 *         description: No Content
 *         content:
 *           application/json:
 *             example:
 *               message: 'У этой компании пока что не заполнено меню.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/all', getMenuItem);


/**
 * @swagger
 * /api/menuItem/edit/{id}:
 *   patch:
 *     summary: Edit a menu item
 *     description: Endpoint for editing an existing menu item.
 *     tags:
 *       - MenuItem
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the menu item to be edited
 *         required: true
 *       - in: body
 *         name: Menu item details
 *         description: Menu item details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               price:
 *                 type: number
 *               caption:
 *                 type: string
 *               description:
 *                 type: string
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
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               caption: "Updated Item"
 *               description: "This is an updated menu item."
 *               price: 1000
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти позицию меню для редактирования.'
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
 *               message: 'У вас недостаточно прав для создания сотрудника.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.patch('/edit/:id', auth, editMenuItem);


/**
 * @swagger
 * /api/menuItem/delete/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     description: Endpoint for deleting a menu item.
 *     tags:
 *       - MenuItem
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the menu item to be deleted
 *         required: true
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
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Позиция меню успешно удалена.'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти позицию меню по переданным параметрам.'
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
 *               message: 'У вас нет прав на удаление позиции меню.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.delete('/delete/:id', auth, deleteMenuItem);



module.exports = router;