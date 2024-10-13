const mongoose = require('mongoose');

const getConnection = async () => {

    try {

        const url = "mongodb+srv://juanUrrego:juan123@cluster0.x3t3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch (error) {
        console.log(error);
    }

    
}

module.exports = {
    getConnection
}