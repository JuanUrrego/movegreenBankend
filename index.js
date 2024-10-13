const express = require('express');
const { getConnection } = require('./db/connection-mongo');
const cors = require('cors');
require('dotenv').config();
const { router } = require('express');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT;

const allowedOrigins = [
    'http://localhost:3000', // Desarrollo
    'https://super-sherbet-1cbf87.netlify.app' // Producción
  ];
  
  // Configuración de CORS
  app.use(cors({
    origin: function (origin, callback) {
      // Si no hay un origen (por ejemplo, en herramientas como Postman), permite la solicitud
      if (!origin) return callback(null, true);
      
      // Verifica si el origen está en la lista de permitidos
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    optionsSuccessStatus: 200
  }));

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