// Verifica se existe usuário autenticado
function checkAuth(req, res, next) {
  
  // Se o usuário estiver logado, passa ao próximo middleware
  if(req.session.isLoggedIn) next()

  // Guarda a url original e redireciona para a página de login
  else {
    req.session.redirectUrl = req.url
    res.redirect('/users/login')
  }

}

module.exports = {
  checkAuth
}