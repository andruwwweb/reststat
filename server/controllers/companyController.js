const { prisma } = require('../prisma/prisma-client')

/**
 * @route POST /api/company/create
 * @desc Создание комапнии
 * @access Privet
*/
const createCompany = async (req, res) => {
    const { caption } = req.body
    const { id, role } = req.user

    try {
        const companyExists = await prisma.company.findMany({where: {
            userId: id
        }})
        if(companyExists.length >= 3) {
            return res.status(400).json({message: "Нельзя зарегистрировать больше трех компаний!"})
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
            return res.status(403).json({message: "У вас нет прав на создание компании."})
        }
    } catch (e) {
        return res.status(500).json({message: 'Ошибка сервера.'})
    }
}

/**
 * @route GET /api/company/get
 * @desc Получение компании
 * @access Privet
*/
const getCompany = async (req, res) => {
    const userId = req.user.id
    try {
        const company = await prisma.company.findMany({where: {
            userId
        }})

        if (company.length < 1) {
            return res.status(200).json({message: "У вас нет зарегистрированных компаний!"})
        }

        return res.status(200).json(company)

    } catch (error) {
        return res.status(500).json({message: 'Ошибка сервера.'})
    }
}

/**
 * @route PATCH /api/company/edit/:id
 * @desc Редактирование компании
 * @access Privet
*/
const editCompany = async (req, res) => {
    const companyId = Number(req.params.id)
    const { caption } = req.body

    if (req.user.role !== 'owner') {
        return res.status(403).json({message: "У вас нет прав на редактирование компании."})
    }

    try {
        let companyExists = await prisma.company.findUnique({
            where: {
                id: companyId,
                userId: Number(req.user.id)
            }
        });

        if (!companyExists) {
            return res.status(404).json({message: "Компания не найдена."});
        }

        const company = await prisma.company.update({
            where: {
                id: companyId,
                userId: req.user.id,
            },
            data: {
                caption: caption
            }
        });

        if (company) {
            return res.status(200).json({message: "Компания успешно обновлена."});
        } else {
            return res.status(400).json({message: "Произошла ошибка при обновлении компании."});
        }

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера: ${error}`});
    }
}

/**
 * @route PATCH /api/company/delete/:id
 * @desc Удаление компании
 * @access Privet
*/
const deleteCompany = async (req, res) => {
    const { id, role } = req.user
    const companyId = Number(req.params.id)

    if (role !== 'owner') {
        return res.status(403).json({message: "У вас нет прав на удаление компании."})
    }

    try {
        const result = await prisma.company.delete({where: {
            id: companyId,
            userId: id
        }})
        if (!result) {
            return res.status(404).json({message: "Не удалось найти компании по переданным параметрам."});
        }
        res.status(200).json({message: "Компания успешно удалена."});

    } catch (error) {
        res.status(500).json({message: "Произошла ошибка при удалении компании."});
    }
}

module.exports = {
    createCompany,
    editCompany,
    deleteCompany,
    getCompany
}