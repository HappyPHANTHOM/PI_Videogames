const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db');
const {  allVgames } = require( '../controllers/vgames_controller');



router.get('/', async(req, res, next) => {
    const { name } = req.query;
    // let nameEncode = encodeURI(name);
    // let nameDecode = decodeURI(name);
    try {
        let infoVideogames = await allVgames();
        /////////////////////////////////////////
        // let a = infoVideogames[0];
        // let b = infoVideogames[1];
        // let c = infoVideogames[2];
        // let d = infoVideogames[3];
        // let e = infoVideogames[4];

        // let info = a.concat(b);
        // let info2 = c.concat(d);
        // let inf0 = info.concat(info2);
        // let total = inf0.concat(e);
        ////////////////////////////////////////
        if(name){
            let vgameName = infoVideogames.filter(e => e.name.toLowerCase() == name.toLowerCase().decodeURI());
            if(vgameName.length === 0){
                res.status(404).send('No se encontro Videojuego');
            } 
            else{
                res.status(200).send(vgameName);
            }
        }else{
            res.status(200).json(infoVideogames);
            
        }
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res) => {
    let { name, description, platforms, genre, rating, createdInDb} = req.body

        try {
            let vgameCreated = await Videogame.create ({
                name,
                description,
                platforms,
                rating,
                createdInDb
            })
        
            let genreDb = await  Genre.findAll({
                where: { name : genre}
            })
        
            vgameCreated.addGenre(genreDb)
            res.send('Videojuego creado con exito')
        } catch (error) {
            console.log(error);
        }
   
})

router.get('/:id', async (req, res) => {
    const {id }= req.params;
    const vgamesTotal = await allVgames()
    if(id){
        let vgame = vgamesTotal.filter( el => el.id == id)
        vgame.length?
        res.status(200).json(vgame):
        res.status(404).send('No se encontro ese id de videojuego')
    }
})

module.exports = router;