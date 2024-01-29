const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if (req.session.user) return res.render('info login')
  return res.render('login')
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if (login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() => {
        return res.redirect('back')
      })
      return
    }

    req.flash('success', 'Login efetuado com sucesso.')
    req.session.user = login.user
    req.session.save(() => {
      return res.redirect('back')
    })
  } catch (e) {
    console.error(e)
    return res.render('404')
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
