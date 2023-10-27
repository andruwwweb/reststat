const prisma = require('../prisma/prisma-client')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Отсутсвует авторизационный токен!"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Отсутствует параметр поиска пользователя" });
        }

        const user = await prisma.user.findUnique({where: {
            id: decoded.id
        }})

        if (!user) {
            return res.status(401).json({ message: "Пользователь не найден" });
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ошибка сервера."})
    }
}
module.exports = {
    auth
}