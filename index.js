require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;


// middlewares
app.use(cors());
app.use(express.json());

// rutas
const usuariosRouter = require('./src/routes/usuarios.route');
const shortRouter = require('./src/routes/shortpolling.route');
//const longpollingRoute = require('./src/routes/longpolling.route');
const shortpollingRoute = require('./src/routes/shortpolling.route');

app.use('/usuarios', usuariosRouter);
//app.use('/long', longpollingRoute);
app.use('/short', shortpollingRoute);

app.listen(4000, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
});