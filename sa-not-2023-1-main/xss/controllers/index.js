const conn = require('../config/database')

const controller = {}

controller.retrieve = async (req, res) => {
  try {
    const response = await conn.query(`
      select * from comments order by datetime desc
    `)

    let comments = ''

    for(row of response.rows) {
      comments += '<hr>\n'
      comments += `<p>Data/hora: ${row.datetime}</p>\n`
      comments += `${row.comment}\n`
    }

    res.render('index', { comments, title: 'Ataque XSS' })

  }
  catch(error) {
    console.error(error)
  }
}

module.exports = controller