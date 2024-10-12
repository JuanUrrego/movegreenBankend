const { Router } = require('express');
const TipoVehiculo = require('../models/TipoVehiculo');
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs');
const { validateJWT } = require('../middleware/validar-jwt');
const { validateRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/', [validateJWT, validateRolAdmin], [
    check('vehiculo', 'invalid.vehiculo').not().isEmpty(),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mansaje: errors.array() });
        }

        let tipo = new TipoVehiculo();
        tipo.vehiculo = req.body.vehiculo;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear el estado del equipo')
    }
});

router.get('/', [ ],  async function(req, res) {
    try {
        const tipo = await TipoVehiculo.find();
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al listar los vehiculos')
    }

});

router.delete('/:id', [ validateJWT, validateRolAdmin ], async function (req, res) {
    try{
        const{id} = req.params
        const tipo = await TipoVehiculo.findByIdAndDelete({_id: id})
        res.send(tipo);
    }catch(error){
        res.status(500).send('Ocurrio un error al eliminar el vehiculo') 
     }
});

router.put('/:tipoId', [ validateJWT, validateRolAdmin ], [
    check('vehiculo', 'invalid.vehiculo').not().isEmpty(),

], async function (req, res) {

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mansaje: errors.array() });
        }

        let tipo = await TipoVehiculo.findById(req.params.tipoId);
        if(!tipo){
            return res.status(400).send('Vehiculo no existe');
        }
        tipo.vehiculo = req.body.vehiculo;

        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();
        res.send(tipo);

    }catch(error){
        console.log(error)
        res.status(500).send('Ocurrio un error al actualizar el vehiculo') 
    }
});

module.exports = router;