const { Router } = require('express');
const apiInfoYpost = require('../routes/vgamesRoute');
const genres = require('./genreRoute');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', apiInfoYpost);

router.use('/genres', genres);

// router.post('/videogames', post);

  



module.exports = router;
