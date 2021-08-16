//Rutas del Backend



/*
Path: api/login
*/


const { Router } = require('express');
const { check } = require('express-validator');


const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos }  = require('../middlewares/validar_campo');
const { validarJWT } = require('../middlewares/validar_jwt');

//Esto es una funcion no una clase
const router = Router();

//Configuracion de la primera ruta
router.post('/new', [

    //middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),//Validacion del campo nombre.
    check('password', 'La contraseña es demasiado corta').not().isEmpty().isLength({ min:8}),
    check('email', 'Coloca un correo válido').isEmail(),
    validarCampos   
] ,crearUsuario );

//Post: / (apuntando solo al "/" )
//Validar email, password

router.post('/' ,[
    check('password', 'La contraseña es demasiado corta').not().isEmpty().isLength({ min:8}),
    check('email', 'Coloca un correo válido').isEmail(),
], login );


router.get('/renew/', validarJWT, renewToken);

//Exportamos aqui
module.exports = router;