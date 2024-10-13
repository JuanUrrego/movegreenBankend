const express = require('express');
const { getConnection } = require('./db/connection-mongo');
const cors = require('cors');
require('dotenv').config();
const { router } = require('express');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT;

app.use(cors({origin: '*', 
optionsSuccessStatus: 200}));

getConnection();

//parseo json
app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/tipoVehiculo', require('./router/tipoVehiculo'));
app.use('/ciudad', require('./router/ciudad'));
app.use('/reserva', require('./router/reserva'));
app.use('/auth', require('./router/auth'));

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
});