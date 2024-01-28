const mongoose = require('mongoose')
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {}

module.exports = LoginModel
