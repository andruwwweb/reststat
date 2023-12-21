const { prisma } = require('../prisma/prisma-client')

/**
 * @route POST /api/order/create
 * @desc Создание заказа
 * @access Privet
*/
const createOrder = async (req, res) => {

    const companyId = req.company.id
    const { orderItems } = req.body

    try {
        for (let i=0; i<orderItems.length; i++) {
            const menuItemExists = await prisma.menuItem.findUnique({where: {
                id: orderItems[i].menuItemId,
                companyId: companyId
            }})
            if (!menuItemExists) {
                return res.status(404).json({message: "Не удалось найти позицию в меню по переданным параметрам при создании заказа!"})
            }
        }

        const order = await prisma.order.create({data: {
            companyId: companyId
        }})
        const orderId = order.id

        let orderItemsList = []

        for (let i=0; i<orderItems.length; i++) {
            const orderItem = await prisma.orderItems.create({
                data: {
                    amount: orderItems[i].amount,
                    menuItemId: orderItems[i].menuItemId,
                    orderId: orderId
                }
            })
            if (orderItem) {
                orderItemsList.push(orderItem)
            } else {
                return res.status(404).json({message: 'Не удалось создать заказ, попробуйте снова!'})
            }
        }

        return res.status(201).json(orderItemsList)
    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}


/**
 * @route GET /api/order/get/:id
 * @desc Получение заказа
 * @access Privet
*/
const getOrder = async (req, res) => {
    const orderId = Number(req.params.id)
    const companyId = req.company.id

    try {
        let order = await prisma.order.findUnique({where: {
            id: orderId,
            companyId: companyId
        }})

        if (!order) {
            return res.status(404).json({message: "Не удалоль найти заказ по переданным парметрам!"})
        }

        let orderItems = await prisma.orderItems.findMany({
            where: {
                orderId
            },
            select: {
                id: true,
                amount: true,
                menuItemId: true,
            }
        })

        if (!orderItems) {
            return res.status(404).json({message: "Не удалоль найти данные для выбранного заказа!"})
        }

        for (let i=0; i<orderItems.length; i++) {
            let orderItemInfo = await prisma.menuItem.findUnique({
                where: {
                    id: orderItems[i].menuItemId,
                    companyId: companyId
                },
                select: {
                    price: true,
                    caption: true,
                    description: true
                }
            })
            orderItems[i].itemInformation = orderItemInfo
        }

        order.menuItems = orderItems

        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}


/**
 * @route GET /api/order/getAll?limit
 * @desc Получение всех заказов (по выбранной дате опционально)
 * @access Privet
*/
const getAllOrders = async (req, res) => {
    const companyId = req.company.id
    const limit = req.query.limit || 10

    const orders = await prisma.order.findMany({where: {
        companyId: companyId
    },
    take: +limit
    })

    if (!orders) {
        return res.status(404).json({message: "Не удалоль найти данные заказов для выбранной компании!"})
    }

    return res.status(200).json(orders)
}

module.exports = {
    getOrder,
    createOrder,
    getAllOrders
}