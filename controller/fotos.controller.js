const pool = require('../database')


const getFotos = async(req, res) => {
    await pool.query('SELECT * FROM Fotos')
    .then(([data]) => res.render('fotos/inicio', {fotos: data}))
}

const getFotosMasVotadas = async(req, res) => {
    await pool.query('SELECT * FROM Fotos ORDER BY likes DESC')
    .then(([data]) => res.render('fotos/inicio', {fotos: data}))
}

const getFotosMenosVotadas = async(req, res) => {
    await pool.query('SELECT * FROM Fotos ORDER BY dislikes DESC')
    .then(([data]) => res.render('fotos/inicio', {fotos: data}))
}

const getFotosComentadas = async(req, res) => {
    
    const [coms] = await pool.query('SELECT foto_id FROM Comentario')
    var fotosComentadas = []
   
    for(i = 0; i < coms.length; i++) {
        var [foto] = await pool.query('SELECT id FROM Fotos WHERE id = ?',[coms[i].foto_id])
        fotosComentadas.push(foto[0])
    }

    const [fotosFinal] = await pool.query('SELECT * FROM Fotos WHERE ?', fotosComentadas)
    res.render('fotos/inicio', {fotos: fotosFinal})
}

const getFotosComentadasUser = async(req, res) => {
    
    const [coms] = await pool.query('SELECT foto_id FROM Comentario')
    var fotosComentadas = []
   
    for(i = 0; i < coms.length; i++) {
        var [foto] = await pool.query('SELECT id FROM Fotos WHERE id = ?',[coms[i].foto_id])
        fotosComentadas.push(foto[0])
    }

    const [fotosFinal] = await pool.query('SELECT * FROM Fotos WHERE ? AND user_id = ?', fotosComentadas, req.user.id)
    console.log(fotosFinal)
    res.render('fotos/user', {fotos: fotosFinal})
}



const FotosUser = async(req, res) => {
    const id = req.user.id
    await pool.query('SELECT * FROM Fotos WHERE user_id = ?', [id])
    .then(([data]) => res.render('fotos/user', {fotos: data}))
}

const crearFotos = (req, res) => res.render('fotos/crear')

const editarFotos = async (req, res) => {
    const {id} = req.params
    const [comentarios] = await pool.query('SELECT * FROM Comentario WHERE foto_id = ?', [id])
    const [foto] = await pool.query('SELECT * FROM Fotos WHERE id = ?', [id])
   
    res.render('fotos/editar', {comentarios: comentarios, foto: foto[0]})
}

const crearFoto = async(req, res) => {
    const {titulo, urlImg, descripcion} = req.body
    const user_id = req.user.id

    newFoto = {
        titulo,
        urlImg,
        descripcion,
        user_id
    }

    const query = 'INSERT INTO Fotos SET ?'

    await pool.query(query, newFoto)
    .then(() => res.redirect('/'))
    
}

const dislikeFoto = async(req, res) => {
    const {id} = req.params
    await pool.query('UPDATE Fotos SET dislikes=dislikes+1 WHERE id = ?', [id])
    .then(() => res.redirect('/'))
}

const LikeFoto = async(req, res) => {
    const {id} = req.params
    await pool.query('UPDATE Fotos SET likes=likes+1 WHERE id = ?', [id])
    .then(() => res.redirect('/'))
}

const eliminarFoto = async(req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM Fotos WHERE id = ?',[id])
    await pool.query('DELETE FROM Comentario WHERE foto_id = ?',[id])
    res.redirect('/fotos/user')
}

const editarFoto = async(req, res) => {
    const {id} = req.params
    const {titulo, descripcion, urlImg} = req.body
    const updateFoto = {
        titulo,
        descripcion,
        urlImg
    }

    await pool.query('UPDATE Fotos SET ? WHERE id = ?', [updateFoto, id])
    .then(() => res.redirect('/fotos/user'))
}


module.exports = {
    getFotos,
    crearFotos,
    crearFoto,
    dislikeFoto,
    LikeFoto,
    getFotosMasVotadas,
    getFotosMenosVotadas,
    FotosUser,
    eliminarFoto,
    editarFotos,
    editarFoto,
    getFotosComentadas,
    getFotosComentadasUser
}