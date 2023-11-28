const { prisma } = require('../prisma/prisma-client')

/**
 * @route POST /api/employee/create
 * @desc Создание сотрудника
 * @access Privet
*/
const createEmployee = async (req, res) => {

}

/**
 * @route PATCH /api/employee/edit
 * @desc Редактирование сотрудника
 * @access Privet
*/
const editEmployee = async (req, res) => {

}

/**
 * @route DELETE /api/employee/delete
 * @desc Удвление сотрудника
 * @access Privet
*/
const deleteEmployee = async (req, res) => {

}

module.exports = {
    createEmployee,
    editEmployee,
    deleteEmployee
}