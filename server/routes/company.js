const express = require('express');
const { auth } = require('../middleware/auth');
const { createCompany, editCompany, deleteCompany } = require('../controllers/companyController');
const router = express.Router();
/**
 * @swagger
 * /api/company/create:
 *   post:
 *     summary: Create a company
 *     description: Endpoint for creating a new company.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: body
 *         name: Company details
 *         description: Company details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             caption:
 *               type: string
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
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               caption: "Company Caption"
 *               userId: 1
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Нельзя зарегистрировать больше одной компании!'
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
 *               message: 'У вас нет прав на создание компании.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.post('/create', auth, createCompany);

/**
 * @swagger
 * /api/company/edit/{id}:
 *   patch:
 *     summary: Edit a company
 *     description: Endpoint for editing an existing company.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the company to be edited
 *         required: true
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: Company details
 *         description: Company details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             caption:
 *               type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Компания успешно обновлена.'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Произошла ошибка при обновлении компании.'
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
 *               message: 'У вас нет прав на редактирование компании.'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Компания не найдена.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ошибка сервера: Описание ошибки.'
 */
router.patch('/edit/:id', auth, editCompany);


/**
 * @swagger
 * /api/company/delete/{id}:
 *   delete:
 *     summary: Delete a company
 *     description: Endpoint for deleting an existing company.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the company to be deleted
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
 *         description: Company deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Компания успешно удалена.'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               message: 'У вас нет прав на удаление компании.'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Не удалось найти компании по переданным параметрам.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Произошла ошибка при удалении компании: Описание ошибки.'
 */
router.delete('/delete/:id', auth, deleteCompany);

module.exports = router;