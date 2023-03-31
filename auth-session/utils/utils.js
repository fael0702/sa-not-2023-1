function checkAuth(req, res, next) {

    // se o usuário estiver logado, passa ao próximo middleware
    if(req.session.isLoggedIn) next()

    // guarda a url original e redireciona para a pagina de login 
    else {
        req.session.redirectUrl = req.url 
        res.redirect('/users/login')
    }
}

module.export = {
    checkAuth
}