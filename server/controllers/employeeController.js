const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @route POST /api/employee/create
 * @desc Создание сотрудника
 * @access Privet
*/
const createEmployee = async (req, res) => {
    const { email, password, companyId } = req.body
    const { role } = req.user
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        if (!email || !password || !companyId) {
            return res.status(400).json({message: "Заполните данные для создания сотрудника."})
        }
        if (!emailRegexp.test(email)) {
            return res.status(400).json({message: "Введите корректный email адрес."})
        }
        if (!role || role !== 'owner') {
            return res.status(403).json({message: "У вас недостаточно прав для создания сотрудника."})
        }

        const registeredEmployee = await prisma.employee.findFirst({where: {
            email
        }})

        if (registeredEmployee) {
            return res.status(400).json({message: "Сотрудник с таким email уже существует"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const employee = await prisma.employee.create({
            data: {
                email,
                password: hashedPassword,
                companyId,
                role: "employee"
            }
        })

        const secret = process.env.JWT_SECRET

        if (employee && secret) {
            return res.status(201).json({
                id: employee.id,
                role: employee.role,
                email: employee.email,
            })
        } else {
            return res.status(400).json({message: "Неизвестная ошибка, не удалось создать сотрудника"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}

/**
 * @route GET /api/employee/all
 * @desc Получение всех сотрудников
 * @access Privet
*/
const getAllEmployees = async (req, res) => {

    const companyId = req.company.id

    try {
        const employees = await prisma.employee.findMany(
            {where: {
                companyId: companyId
                },
                select: {
                    id: true,
                    role: true,
                    email: true,
                }
            })

        if (!employees) {
            return res.status(400).json({message: "Не удалось найти сотрудников для выбранной компании."});
        }

        return res.status(200).json(employees)
    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}


/**
 * @route DELETE /api/employee/delete/:id
 * @desc Удаление сотрудника
 * @access Privet
*/
const deleteEmployee = async (req, res) => {
    const { role } = req.user
    const employeeId = Number(req.params.id)

    if (!role || role !== 'owner') {
        return res.status(400).json({message: "У вас нет прав на удаление сотрудника."})
    }
    
    try {
        const result = await prisma.employee.delete({where: {
            employeeId
        }})
        if (!result) {
            return res.status(400).json({message: "Не удалось найти сотрудника для удаления по переданным параметрам."});
        }
        res.status(200).json({message: "Сотрудник успешно удален."});

    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}

module.exports = {
    createEmployee,
    deleteEmployee,
    getAllEmployees
}