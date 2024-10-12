const { Schema, model } = require('mongoose');

const CiudadSchema = Schema({
    ciudad: {type: String, required: true},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model ('Ciudad', CiudadSchema);