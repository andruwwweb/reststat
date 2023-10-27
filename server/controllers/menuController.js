const { prisma } = require('../prisma/prisma-client')

/**
 * @route GET /api/menu
 * @desc Getting all menu
 * @access Private
*/
const getMenu = async (req, res) => {
    try {
        const menu = await prisma.menu.findMany()
        res.status(200).json(menu)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Не удалось получить меню"})
    }
}
/**
 * @route POST /api/menu/add
 * @desc Creating one item in menu
 * @access Private
*/
const addOne = async (req, res) => {
    try {
        const data = req.body

        if (!data.title || !data.price || !data.description) {
            return res.status(400).json({message: "Заполните все обязательные поля."})
        }
        // if (req.user.role !== 'owner' || 'admin') {
        //     return res.status(400).json({message: "У вас недостаточно прав на выполнение этого запроса."})
        // }

        const menu = await prisma.menu.create({
            data: {
                ...data
            }
        })

        return res.status(201).json(menu)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Не удалось создать позицию"})
    }
}
/**
 * @route POST /api/menu/remove/:id
 * @desc Deleting one menu item
 * @access Private
*/
const removeOne = async (req, res) => {
    const id = req.params.id
    try {
        let menu = await prisma.menu.findFirst({where: {
            id: id
        }})
        if (!menu) {
            return res.status(500).json('Не удалось найти такою позицию')
        } else {
            await prisma.menu.delete({where: {
                id: id
            }})
            return res.status(200).json({message: "Удалено"})
        }
    } catch (error) {
        res.status(500).json({message: "Не удалось удалить позицию"})
    }
}
/**
 * @route PUT /api/menu/edit/:id
 * @desc Edit one employee
 * @access Private
*/
const editOne = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        await prisma.menu.update({
            where: {
                id: id
            },
            data
        })
        return res.status(200).json({message: "Данные о позиции успешно изменены"})
    } catch (error) {
        res.status(500).json({message: "Не удалось внести изменения в позицию"})
    }
}
module.exports = {
    getMenu,
    addOne,
    removeOne,
    editOne
}