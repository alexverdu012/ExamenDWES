const pool = require('../database')

const getComentarios = async(req, res) => {
    const {foto_id} = req.params
    const [comentarios] = await pool.query('SELECT * FROM Comentario WHERE foto_id = ?', [foto_id])
    const [foto] = await pool.query('SELECT * FROM Fotos WHERE id = ?', [foto_id])
    console.log(comentarios)
    res.render('fotos/comentarios', {comentarios: comentarios, foto: foto[0]})
}

const postComentario = async(req, res) => {
    const  {comentario} = req.body
    const {foto_id} = req.params
    const Newcomentario = {
        comentario,
        foto_id,
        username: req.user.username
    }
    const query = 'INSERT INTO Comentario SET ?'
    await pool.query(query, Newcomentario).then(() => res.redirect(`/comentarios/${foto_id}`))
}

const deleteCometario = async(req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM Comentario WHERE id = ?',[id])
    .then(() => res.redirect('/fotos/user'))
}

module.exports = {
    getComentarios,
    postComentario,
    deleteCometario
}