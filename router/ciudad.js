const { Router } = require('express');
const Ciudad = require('../models/Ciudad');
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs');
const { validateJWT } = require('../middleware/validar-jwt');
const { validateRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/',[ validateJWT, validateRolAdmin ], [
    check('ciudad', 'invalid.ciudad').not().isEmpty(),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mansaje: errors.array() });
        }

        let ciudad = new Ciudad();
        ciudad.ciudad = req.body.ciudad;

        ciudad.fechaCreacion = new Date();
        ciudad.fechaActualizacion = new Date();

        ciudad = await ciudad.save();
        res.send(ciudad);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear la ciudad')
    }
});

router.get('/', [ ],  async function(req, res) {
    try {
        const ciudad = await Ciudad.find();
        res.send(ciudad);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al listar las ciudades')
    }

});

router.delete('/:id', [ validateJWT, validateRolAdmin ], async function (req, res) {
    try{
        const{id} = req.params
        const ciudad = await Ciudad.findByIdAndDelete({_id: id})
        res.send(ciudad);
    }catch(error){
        res.status(500).send('Ocurrio un error al eliminar la ciudad') 
     }
});

router.put('/:ciudadId', [ validateJWT, validateRolAdmin ], [
    check('ciudad', 'invalid.ciudad').not().isEmpty(),

], async function (req, res) {

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mansaje: errors.array() });
        }

        let ciudad = await Ciudad.findById(req.params.ciudadId);
        if(!ciudad){
            return res.status(400).send('Ciudad no existe');
        }
        ciudad.ciudad = req.body.ciudad;

        ciudad.fechaActualizacion = new Date();

        ciudad = await ciudad.save();
        res.send(ciudad);

    }catch(error){
        console.log(error)
        res.status(500).send('Ocurrio un error al actualizar la ciudad') 
    }
});

module.exports = router;