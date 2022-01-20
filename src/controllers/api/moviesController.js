const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const apiMoviesController = {
    create: function (req,res) {
        let movieToCreate = {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
        }
        Movies
        .create(movieToCreate)
        .then((movie)=> {
            res.status(201).json({
                meta:{
                    status: 201,
                    total: 1,
                    url: "api/movies/create"
                },
                data: movie
            })
        })            
        .catch(error => res.status(500).json(error))
    },
    destroy: function (req,res) {
        let movieId = req.params.id;
        //Promesa 1: Guardada en la variable movieToRespond
        let movieToRespond = db.Movie.findByPk(movieId) //Busca en la BBDD la peli que viene por params
            .then(movie => {
                return movie; //responde la película que buscamos y la guarda en movieToRespond
            });
            //Promesa 2: Guardada en la variable destroyMovie
        let destroyMovie = Movies
                .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        //Se llama a todas las promesas, entre [] se indican todas las que se quiere ejectuar
        Promise.all ([movieToRespond, destroyMovie]) 
            //El .then será la ejecución una vez se ejecuten todas las promesas. entre [] se indica la devolución de las promesas ejecutadas
            .then(([movie])=>{
                res.status(200).json({
                    meta:{
                        status: 200,
                        total: 1,
                        url: `api/movies/delete/${movieId}`
                    },
                    data: movie
                })
            })
            .catch(error => res.status(500).json(error))           
    }
            

}

module.exports = apiMoviesController