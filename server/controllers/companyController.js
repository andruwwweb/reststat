const { prisma } = require('../prisma/prisma-client')

/**
 * @route POST /api/company/create
 * @desc Создание комапнии
 * @access Public
*/

const createCompany = async (req, res) => {
    const { caption } = req.body
    const { id, role } = req.user

    try {
        const companyExists = await prisma.company.findFirst({where: {
            userId: id
        }})

        if(companyExists) {
            return res.status(400).json({message: "У вас уже есть зарегистрированная компания"})
        }
        if (role === 'owner') {
            const company = await prisma.company.create({data: {
                caption,
                userId: id
            }})
            if (company) {
                return res.status(201).json(company)
            }
        } else {
            return res.status(400).json({message: "У вас нет прав на создание компании."})
        }
        return
    } catch (e) {
        return res.status(500).json({message: 'Ошибка сервера.'})
    }
}

const editCompany = async (req, res) => {

}

module.exports = {
    createCompany,
    editCompany
}