const Register = require('../models/RegisterModel')

exports.index = (req, res) => {
  res.render('register')
}

exports.register = async (req, res) => {
  try {
    const register = new Register(req.body)
    await register.register()

    if (register.errors.length > 0) {
      req.flash('errors', register.errors)
      req.session.save(() => {
        return res.redirect('back')
      })
      return
    }
    req.flash('success', 'Conta criada com sucesso.')
      req.session.save(() => {
        return res.redirect('back')
      })
  } catch (e) {
    console.error(e)
    return res.render('404')
  }
}
