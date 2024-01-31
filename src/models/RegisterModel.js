const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const RegisterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const RegisterModel = mongoose.model('Register', RegisterSchema)

class Register {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async register() {
    await this.userExists()

    if (this.errors.length > 0) return
    
    this.validateData()
    
    if (this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)
    this.user = await RegisterModel.create(this.body)    
  }

  async userExists() {
    this.user = await RegisterModel.findOne({ email: this.body.email })
    if (this.user) this.errors.push('Usuário já existe.')
  }

  validateData() {
    this.cleanUp()
    if (!validator.isEmail(this.body.email))
      this.errors.push('E-mail inválido.')

    if (this.body.password.length < 3 || this.body.password.length > 50)
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      email: this.body.email.trim(),
      password: this.body.password.trim(),
    }
  }
}

module.exports = { Register, RegisterModel}
