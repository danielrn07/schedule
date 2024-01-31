const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
  const contacts = await Contact.getContact()
  res.render('index', { contacts })
}
