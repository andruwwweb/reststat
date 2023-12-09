const { prisma } = require('../prisma/prisma-client')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Отсутсвует авторизационный токен!"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded || !decoded.id || !decoded.role) {
            return res.status(401).json({ message: "Отсутствует параметр поиска пользователя" });
        }

        if (decoded.role === 'owner') {
            const user = await prisma.user.findUnique({where: {
                id: decoded.id
            }})
            if (!user) {
                return res.status(401).json({ message: "Пользователь не найден" });
            }
            req.user = user
            next()
        }
        else if (decoded.role === 'employee') {
            const user = await prisma.employee.findUnique({where: {
                id: decoded.id
            }})
            if (!user) {
                return res.status(401).json({ message: "Пользователь не найден" });
            }
            req.user = user
            next()
        }
        else {
            return res.status(401).json({ message: "Не удалось верифицировать инициатора запроса." });
        }

    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}
module.exports = {
    auth
}