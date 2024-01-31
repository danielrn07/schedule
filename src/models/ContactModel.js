const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  registrationDate: { type: Date, default: Date.now },
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact {
  constructor(body) {
    this.body = body
    this.errors = []
    this.contact = null
  }

  async register() {
    this.validateData()
    if (this.errors.length > 0) return
    this.contact = await ContactModel.create(this.body)
  }

  validateData() {
    this.cleanUp()

    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push('E-mail inválido.')

    if (!this.body.name) this.errors.push('O nome do contato é obrigatório.')

    if (!this.body.phoneNumber && !this.body.email)
      this.errors.push(
        'É necessário adicionar um número ou e-mail para cadastrar um novo contato.',
      )
  }
  async edit(id) {
    if (typeof id !== 'string') return
    this.validateData()
    if (this.errors.length > 0) return
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    })
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      name: this.body.name.trim(),
      phoneNumber: this.body.phoneNumber.trim(),
      email: this.body.email.trim(),
      registrationDate: this.body.registrationDate,
    }
  }

  static async getById(id) {
    if (typeof id !== 'string') return
    return await ContactModel.findById(id)
  }

  static async getContact() {
    const contacts = await ContactModel.find().sort({ registrationDate: -1 })
    return contacts
  }

  static async delete(id) {
    if (typeof id !== 'string') return
    const contact = await ContactModel.findOneAndDelete({ _id: id })
    return contact
  }
}

module.exports = Contact
