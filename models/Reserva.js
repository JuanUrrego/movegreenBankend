const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    ciudad: {type: Schema.Types.ObjectId, ref: 'Ciudad', required: true},
    tipoVehiculo:{type: Schema.Types.ObjectId, ref: 'TipoVehiculo', required: true},
    fechaCreacion: {type: Date, required: true},
    fechaReserva: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model ('Reserva', ReservaSchema);