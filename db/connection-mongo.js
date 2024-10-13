const mongoose = require('mongoose');

const getConnection = async () => {

    try {

        const url = "   "

        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch (error) {
        console.log(error);
    }

    
}

module.exports = {
    getConnection
}