exports.checkCsrfError = (error, req, res, next) => {
  if (error) {
    return res.render('404')
  }
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user
  next()
}

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'É necessário entrar na sua conta para cadastrar um novo contato.')
    req.session.save(() => res.redirect('/'))
    return
  }

  next();
}
