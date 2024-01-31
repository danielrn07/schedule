const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const registerController = require('./src/controllers/registerController')
const contactController = require('./src/controllers/contactController')
const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index)

// Rotas de login
route.get('/login', loginController.index)
route.post('/login', loginController.login)
route.get('/register', registerController.index)
route.post('/register', registerController.register)
route.get('/logout', loginController.logout)

// Rotas de contato
route.get('/contact', loginRequired, contactController.index)
route.post('/contact', loginRequired, contactController.register)
route.get('/contact/:id', loginRequired, contactController.editIndex)
route.post('/contact/:id', loginRequired, contactController.edit)

module.exports = route
