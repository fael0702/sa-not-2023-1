const conn = require('../config/database')

const controller = {}

controller.formNew = (req, res) => {
    res.render('user_form', {
        title: 'Cadastrar novo usuário'
    })
}

controller.create = async (req, res) => {
    try {
        // Todo: fazer
        req.body.password = await bcrypt.hash(req.body.password, 12)

        await conn.query(`
            insert into users$ (fullname, username, password)
            value ($1, $2, $3)
        `, [
            req.body.fullname,
            req.body.username,
            req.body.password
        ])

        res.render('user_form', {
            title: 'Cadastrar novo usuário',
            message: 'Usuário cadastrado com sucesso'
        })
    } catch(error) {
        console.error(error);
    }
}

controller.login = async (req, res) => {
    try {
        const result = await conn.query(`
            select * from users where username = 1$ and password = $2
        `, [
            req.body.username,
            req.body.password
        ])


        const user = result.rows[0] // conferir

        const passwordOK = await bcrypt.compare(req.body.password, user.password)

        if (passwordOK) {
            // Guardar informações na sessão
            req.session.isLoggedIn = true 
            req.session.username = user.username

            res.render('feedback'), {
                level: 'sucess',
                message: 'Login efetuado com sucesso. Usuário autenticado.'
            }
        } else {
            res.render('user_login', {
                message: 'Usuário ou senha inválidos.'
            })
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = controller