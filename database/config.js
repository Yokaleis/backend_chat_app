const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.DB_CHATAPP, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        const Cat = mongoose.model('Cat', { name: String });

        const kitty = new Cat({ name: 'Zildjian' });
        kitty.save().then(() => console.log('meow'));

        console.log('DB online!');

    }catch (error) {
        console.log(error);
        throw new Error('Error en Base de Datos');
    }
}

module.exports = {
    dbConnection
}