const { prisma } = require('../prisma/prisma-client')

/**
 * @route POST /api/menuItem/create
 * @desc Создание позиции меню
 * @access Privet
*/
const createMenuItem = async (req, res) => {
    const { price, caption, description } = req.body
    const { role } = req.user
    try {
        if (!role || role !== 'owner') {
            return res.status(400).json({message: "У вас недостаточно прав для добавления позиции в меню."})
        }

        const companyId = req.company.id


        if (!price || !caption || !description) {
            return res.status(401).json({message: 'Заполните все поля!'})
        }
        let menuItem = await prisma.menuItem.create({
            data: {
                price,
                caption,
                description,
                companyId
            }
        })
        if ( menuItem ) {
            return res.status(201).json({
                id: menuItem.id,
                price: menuItem.price,
                caption: menuItem.caption,
                description: menuItem.description,
                companyId: menuItem.companyId
            })
        } else {
            return res.status(400).json({message: "Неизвестная ошибка, не удалось добавить позицию в меню!"})
        }
    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}

/**
 * @route PATCH /api/menuItem/edit/:id
 * @desc Редактирование позиции меню
 * @access Privet
*/
const editMenuItem = async (req, res) => {
    const menuItemId = Number(req.params.id)
    const { description, caption, price } = req.body
    const { role } = req.user

    try {
        if (!role || role !== 'owner') {
            return res.status(400).json({message: "У вас недостаточно прав для создания сотрудника."})
        }

        const menuItem = await prisma.menuItem.findUnique({where: {
            id: menuItemId
        }})

        if (!menuItem) {
            return res.status(400).json({message: "Не удалось найти позицию меню для редактирования."})
        }

        const editedMenuItem = await prisma.menuItem.update({
            where: {
                id: menuItemId,
            },
            data: {
                caption,
                description,
                price
            }
        })

        if (editedMenuItem) {
            return res.status(200).json({
                id: editedMenuItem.id,
                caption: editedMenuItem.caption,
                description: editedMenuItem.description,
                price: editedMenuItem.price
            })
        }
    } catch (error) {
        res.status(500).json({message: `Ошибка сервера: ${error}`});
    }
}

/**
 * @route PATCH /api/menuItem/delete/:id
 * @desc Удаление позиции меню
 * @access Privet
*/
const deleteMenuItem = async (req, res) => {
    const menuItemId = Number(req.params.id)
    const { role } = req.user

    if (!role || role !== 'owner') {
        return res.status(400).json({message: "У вас нет прав на удаление позиции меню."})
    }

    try {
        const result = await prisma.menuItem.delete({where: {
            id: menuItemId,
        }})
        if (!result) {
            return res.status(400).json({message: "Не удалось найти позицию меню по переданным параметрам."});
        }
        res.status(200).json({message: "Позиция меню успешно удалена."});

    } catch (error) {
        res.status(500).json({message: `Ошибка сервера: ${error}`});
    }
}

/**
 * @route GET /api/menuItem/all
 * @desc Получение всех позиции меню
 * @access Privet
**/

const getMenuItem = async (req, res) => {
    const { companyId } = req.body

    const menu = await prisma.menuItem.findMany({where: {
        companyId
    }})

    if (!menu) {
        return res.status(404).json({message: "Не удалось найти меню указанной компании!"})
    }
    if (!menu.length) {
        return res.status(200).json({message: "У этой компании пока что не заполнено меню."})
    }

    return res.status(200).json({
        data: menu
    })
}

module.exports = {
    createMenuItem,
    editMenuItem,
    deleteMenuItem,
    getMenuItem
}