const jwt = require('jsonwebtoken');


//Validar Token
const validarJWT = ( req, res, next) => {

    //Leer el token
    const token = req.header('x-token');

    //console.log(token);

    if( !token ) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }

    try {
        
        //Validar el token 

        //Primero extraer el uid
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
        
    }

    
}

module.exports = {
    validarJWT
}