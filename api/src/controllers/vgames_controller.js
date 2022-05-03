const axios = require('axios');
const { Videogame, Genre } = require('../db');

// const getApiInfo = async () => {
//     // const apiUrl = await axios.get('https://api.rawg.io/api/games?key=716d5b00f87b48eea9ad23eaf2b48a35&limit=100');
//    try {
//        let info = [];
//        for(let i = 1; i <= 5; i++){
//         info.push(axios.get(`https://api.rawg.io/api/games?key=716d5b00f87b48eea9ad23eaf2b48a35&page=${i}` ))
//        }

//        return await Promise.all(info).then(res => {
//            const pruebaCount = res.map( ele => {
//                return  ele.data.results.map( element =>{
//                    return { id: element.id,
//                             name: element.name,
//                             description: element.tags.map(e => e.name),
//                             release_date: element.released,
//                             rating: element.rating,
//                             platforms: element.platforms.map(e => e.platform.name),
//                             genre: element.genres.map(e => e.name)
//                             }
//                })
//            })
//            return pruebaCount;
//        })
//    }catch (error) {
//         console.log(error);
//    }
// }

const getApiInfo = async () => {
    // const apiUrl = await axios.get('https://api.rawg.io/api/games?key=716d5b00f87b48eea9ad23eaf2b48a35&limit=100');
   try {
       let info = [];
       for(let i = 1; i <= 5; i++){
        info.push(axios.get(`https://api.rawg.io/api/games?key=716d5b00f87b48eea9ad23eaf2b48a35&page=${i}` ))
       }
       
       return await Promise.all(info).then(res => {
           const pruebaCount = res.map( ele => {
               return  ele.data.results.map( element =>{
                   return { id: element.id,
                        name: element.name,
                        description: element.tags.map(e => e.name),
                        release_date: element.released,
                        rating: element.rating,
                        platforms: element.platforms.map(e => e.platform.name),
                        genre: element.genres.map(e => e.name)

                            }
               })
           })
           return pruebaCount;
       })
   }catch (error) {
        console.log(error);
   }
}

const heroe = async () => {
    let infoVideogames = await getApiInfo();
        /////////////////////////////////////////
        let a = infoVideogames[0];
        let b = infoVideogames[1];
        let c = infoVideogames[2];
        let d = infoVideogames[3];
        let e = infoVideogames[4];

        let info = a.concat(b);
        let info2 = c.concat(d);
        let inf0 = info.concat(info2);
        let total = inf0.concat(e);
        return total;
}


const videogamesDb = async () => {
    try {
        return await Videogame.findAll({
            include:{
                model: Genre,
                attributes: [ 'name'],
                throught: {
                    attributes:[],
                }
            }
        })
        .then(g => g.map(ele => {
            return {
                id: ele.id,
                name: ele.name,
                description: ele.tags.map(e => e.name),
                release_date: ele.released,
                rating: ele.rating,
                platforms: ele.platforms.map(e => e.platform.name),
                genre: ele.genres.map(e => e.name)  
            }
        }))
    } catch (error) {
        console.log(error);
    }
}

const allVgames = async () => {
    try {
        let apiInfo = await heroe();
        let dbInfo = await videogamesDb();
        let infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
    } catch (error) {
        console.log(error)
    }
}

const getGenre = async (req, res) => {
    const genre = await axios.get('https://api.rawg.io/api/genres?key=716d5b00f87b48eea9ad23eaf2b48a35');
    const genreVgame = genre.data.results;

    genreVgame.forEach( info => {
        Genre.findOrCreate({
            where: {
                name: info.name
            }
        })
    })

    const allGenres = await Genre.findAll();
    return allGenres;
}

// const allVgameID = async (id) => {
//     try {
//         if(!id.includes('-')){
            
//         }
//     } catch (error) {
//         return 'No se encontro Videojuego';
//     }
// }

module.exports = { getApiInfo, videogamesDb, allVgames, getGenre, heroe };