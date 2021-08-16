const { validationResult } = require('express-validator');
//Middleware personalizado
//NOTA: Es recomendable crear un middleware por cada servicio


/*"Next" es un callback que le indica a express continuar con el siguiente middleware*/
const validarCampos = (req, res, next) => {

    const errores = validationResult( req );

    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}