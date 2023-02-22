const {Router} = require('express')
const router = Router()
const {getComentarios, postComentario, deleteCometario} = require('../controller/comentario.controller')
const {isLogged} = require('../lib/auth')

router.get('/:foto_id', getComentarios)
router.post('/crear/:foto_id', isLogged, postComentario)
router.get('/delete/:id', isLogged, deleteCometario)

module.exports = router