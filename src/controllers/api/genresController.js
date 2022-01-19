const db = require('../../database/models');
const sequelize = db.sequelize;
// /controllers/api/genresController.js

const apiGenresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                //Poner un status dentro del res.json es buena práctica. El 200, indica que todo salió bien
                res.status(200).json({
                    meta:{
                        status: 200,
                        total: genres.length,
                        url: "api/genres"
                    },
                    data: genres
                })
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.status(200).json({
                    meta:{
                        status: 200,
                        total: 1,
                        url: `api/genres/detail/${req.params.id}`
                    },
                    data: genre
                })
            });
    }

}

module.exports = apiGenresController;