const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @route POST /api/user/login
 * @desc Вход пользователя
 * @access Public
*/
const login = async (req, res) => {
    const { tel, password } = req.body

    try {
        if (!tel || !password) {
            return res.status(400).json({message: "Заполните данные для входа"})
        }
    
        const user = await prisma.user.findFirst({where: {
            tel: tel
        }})
    
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
        const secret = process.env.JWT_SECRET
    
        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                tel: user.tel,
                token: jwt.sign({id: user.id}, secret, {expiresIn: "24h"})
            })
        } else {
            return res.status(400).json({message: "Неверено введен телефон или пароль"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Ошибка сервера.'})
    }
}
/**
 * @route POST /api/registration
 * @desc Регистрация пользователя
 * @access Public
*/
const registration = async (req, res) => {
    try {
        const { password, tel, name, email } = req.body
        if (!email || !password || !name || !tel) {
            return res.status(400).json({message: "Заполните указанные поля."})
        }
        const registeredUser = await prisma.user.findFirst({where: {
            tel,
            email
        }})
    
        if (registeredUser) {
            return res.status(400).json({message: "Пользователь с таким номером телефона или email уже существует"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const user = await prisma.user.create({
            data: {
                name,
                tel,
                email,
                role: 'owner',
                password: hashedPassword
            }
        })
    
        const secret = process.env.JWT_SECRET
    
        if (user && secret) {
            res.status(201).json({
                id: user.id,
                tel: user.tel,
                role: user.role,
                email: user.email,
                name: user.name,
                token: jwt.sign({id: user.id, role: user.role}, secret, {expiresIn: "24h"})
            })
        } else {
            return res.status(400).json({message: "Неизвестная ошибка, не удалось создать пользователя"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Ошибка сервера.'})
    }
}
/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Privat
 */
const current = async (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    login,
    registration,
    current,
}