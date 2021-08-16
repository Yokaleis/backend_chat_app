const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: true
    },
});

//Renombrar o sobrescribir un metodo
UsuarioSchema.method('toJSON', function(){

    //Extraer mediante desestructuracion. 
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;


});



module.exports = model('Usuario', UsuarioSchema);