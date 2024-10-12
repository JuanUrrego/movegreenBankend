const { Router } = require('express');
const Reserva = require('../models/Reserva');
const { validationResult, check } = require('express-validator');
const { validateJWT } = require('../middleware/validar-jwt');
const { validateRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/',[ ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').not().isEmpty(),
    check('ciudad', 'invalid.ciudad').not().isEmpty(),
    check('tipoVehiculo', 'invalid.tipoVehiculo').not().isEmpty(),
    check('fechaReserva', 'invalid.fechaReserva').not().isEmpty(),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mansaje: errors.array() });
        }

       let reserva = new Reserva();
       reserva.nombre = req.body.nombre;
       reserva.email = req.body.email;
       reserva.ciudad = req.body.ciudad;
       reserva.tipoVehiculo = req.body.tipoVehiculo;
       reserva.fechaReserva = req.body.fechaReserva;
       reserva.fechaCreacion = new Date();
       reserva.fechaActualizacion = new Date();

       reserva = await reserva.save();
       res.send(reserva);       


    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear la reserva')
    }

});

router.get('/', async function(req, res) {
    try {
        const reserva = await Reserva.find().populate([
            {
                path: 'ciudad', select: 'ciudad'
            },
            {
                path: 'tipoVehiculo', select: 'vehiculo' 
            },

        ]);
        res.send(reserva);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al listar las reservas')
    }
});

router.delete('/:id', [ ], async function (req, res) {
    try{
        const{id} = req.params
        const reserva = await Reserva.findByIdAndDelete({_id: id})
        res.send(reserva);
    }catch(error){
        res.status(500).send('Ocurrio un error al eliminar la reserva') 
     }
});

router.put('/:reservaId', [ ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').not().isEmpty(),
    check('ciudad', 'invalid.ciudad').not().isEmpty(),
    check('tipoVehiculo', 'invalid.tipoVehiculo').not().isEmpty(),
    check('fechaReserva', 'invalid.fechaReserva').not().isEmpty(),
], async function (req, res) {

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mansaje: errors.array() });
        }

        let reserva = await Reserva.findById(req.params.reservaId);
        if(!reserva){
            return res.status(400).send('Reserva no existe');
        }
        reserva.nombre = req.body.nombre;
        reserva.email = req.body.email;
        reserva.ciudad = req.body.ciudad;
        reserva.tipoVehiculo = req.body.tipoVehiculo;
        reserva.fechaReserva = req.body.fechaReserva;
        reserva.fechaActualizacion = new Date();
 
        reserva = await reserva.save();
        res.send(reserva); 

    }catch(error){
        console.log(error)
        res.status(500).send('Ocurrio un error al actualizar la reserva') 
    }
});

module.exports = router;