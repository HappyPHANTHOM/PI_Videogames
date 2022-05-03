const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db');
const {  getGenre } = require( '../controllers/vgames_controller');

router.get('/', async (req, res) => {
    try {
        let vgameGenre = await getGenre();
        res.json(vgameGenre);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;