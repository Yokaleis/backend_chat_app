const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    //Estraer el email
    const { email, password } = req.body;

    //Confirmar si el email existe en la BD
    try{

        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'Este email ya esta registrado'
            });
        }

        //Nueva instancia del modelo
        const usuario = new Usuario( req.body );   
        
        //Encriptar contrase**a
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        //Generar JWT (Json Web Token)
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            //msg: 'Crear nuevo usuario :)'
            usuario,
            token,
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Contacta a soporte tecnico'
        })
    }    
}

const login = async (req, res = response) => {

    const { email, password } = req.body;
    
    try {

        //Validar email
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar password
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password);
        if( !validarPassword ){
            return res.status(400).json({
                ok:false,
                msg: 'La contraseña es incorrecta'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuarioDB.id );
        

        //Respuesta de Login exitoso
        res.json({
            ok: true,
            //msg: 'Crear nuevo usuario :)'
            usuario: usuarioDB,
            token,
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contacta a soporte tecnico'
        });
        
    }
}


//Renew token = Nuevo token
const renewToken = async ( req, res = response) => {

    //cons iud del usuario
    const uid = req.uid;

    //Generar nuevo token - nuevo JWT
    const token = await generarJWT( uid );

    //Obtener el usuario por el uid (hacer referencia al modelo de mongoose: Usuario.findById...)
    const usuario = await Usuario.findById( uid );

    return res.json({
        ok:true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}