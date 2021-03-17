const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/auth');
const { login }= require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {renewToken}  = require('../controllers/auth');

/*
path: 'api/login'

*/

const router =Router();



router.post('/new' ,[
check('nombre','El nombre es obligatorio.').not().isEmpty(),
check('email','El email es obligatorio.').not().isEmpty(),
check('password','El password es obligatorio.').not().isEmpty(),
check('email','el email no es valido.').normalizeEmail().isEmail(),
validarCampos
],crearUsuario);


router.post('/' ,[    
    check('email','El email es obligatorio.').not().isEmpty(),
    check('password','El password es obligatorio.').not().isEmpty(),
    check('email','el email no es valido.').normalizeEmail().isEmail(),
    validarCampos
    ],login);


    router.get('/renew' ,validarJWT,renewToken );

module.exports = router;