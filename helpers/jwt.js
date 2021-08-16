const jwt = require('jsonwebtoken');


//Generar JWT (Json Web Token)
const generarJWT = ( uid ) => {

   return new Promise( (resolve, reject) => {

    const payload = { uid };

    jwt.sign( payload, process.env.JWT_KEY, {
        expiresIn: '24h',
    }, (err, token ) => {
        if( err ){
            //No se pudo generar el token
            reject('No se pudo generar el JWT');
        } else{
            //TOKEN creado
            resolve( token );
        }
    });

   });

}

module.exports = { generarJWT }