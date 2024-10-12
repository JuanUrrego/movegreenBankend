const { Schema, model } = require('mongoose');

const TipoVehiculoSchema = Schema({
    vehiculo: {type: String, required: true},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model ('TipoVehiculo', TipoVehiculoSchema);