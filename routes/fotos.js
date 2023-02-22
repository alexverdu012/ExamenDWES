const {Router} = require('express')
const router = Router()
const 
{
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
} = require('../controller/fotos.controller')
const {isLogged} = require('../lib/auth')

router.get('/', getFotos)
router.get('/masvotadas', getFotosMasVotadas)
router.get('/menosvotadas', getFotosMenosVotadas)
router.get('/comentadas', getFotosComentadas)
router.get('/user/comentadas', getFotosComentadasUser)

router.get('/fotos/crear', isLogged, crearFotos)
router.post('/fotos/crear', isLogged, crearFoto)
router.get('/fotos/dislike/:id', isLogged, dislikeFoto)
router.get('/fotos/like/:id', isLogged, LikeFoto)
router.get('/fotos/user', isLogged, FotosUser)
router.get('/fotos/eliminar/:id', isLogged, eliminarFoto)
router.get('/fotos/editar/:id', isLogged, editarFotos)
router.post('/fotos/editar/:id', isLogged, editarFoto)
module.exports = router