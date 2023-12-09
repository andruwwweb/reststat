const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @route POST /api/user/login
 * @desc Вход пользователя
 * @access Public
*/
const login = async (req, res) => {
    const { email, password, role } = req.body

    try {
        if (!email || !password || !role) {
            return res.status(400).json({message: "Заполните данные для входа"})
        }
    
        if (role === 'owner') {
            const user = await prisma.user.findFirst({where: {
                email: email
            }})
        
            const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
            const secret = process.env.JWT_SECRET
        
            if (user && isPasswordCorrect && secret) {
                return res.status(200).json({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    token: jwt.sign({id: user.id, role: user.role}, secret, {expiresIn: "24h"})
                })
            } else {
                return res.status(400).json({message: "Неверено введен email или пароль"})
            }
        }
        else if (role === 'employee') {
            const employee = await prisma.employee.findFirst({where: {
                email: email
            }})

            const isPasswordCorrect = employee && (await bcrypt.compare(password, employee.password))
            const secret = process.env.JWT_SECRET
        
            if (employee && isPasswordCorrect && secret) {
                return res.status(200).json({
                    id: employee.id,
                    email: employee.email,
                    token: jwt.sign({id: employee.id, role: employee.role}, secret, {expiresIn: "24h"})
                })
            } else {
                return res.status(400).json({message: "Неверено введен email или пароль"})
            }
        }
    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
    }
}
/**
 * @route POST /api/registration
 * @desc Регистрация пользователя
 * @access Public
*/
const registration = async (req, res) => {
    try {
        const { password, name, email } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password || !name) {
            return res.status(400).json({message: "Заполните указанные поля."})
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Введите корректный email адрес."})
        }
        
        const registeredUser = await prisma.user.findFirst({where: {
            email
        }})
    
        if (registeredUser) {
            return res.status(400).json({message: "Пользователь с таким email уже существует"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                role: 'owner',
                password: hashedPassword
            }
        })

        const secret = process.env.JWT_SECRET

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                role: user.role,
                email: user.email,
                name: user.name,
                token: jwt.sign({id: user.id, role: user.role}, secret, {expiresIn: "24h"})
            })
        } else {
            return res.status(400).json({message: "Неизвестная ошибка, не удалось создать пользователя"})
        }
    } catch (error) {
        return res.status(500).json({message: `Ошибка сервера: ${error}`})
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