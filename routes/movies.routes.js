const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


router.get('/create', (req, res, next) => {
    Celebrity.find({}, (err, celebrities) => {
        if (err) {
            res.render('error');
        } else {
            res.render('movies/new-movie', { celebrities });
        }
    });
});


router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    const newMovie = new Movie({
        title,
        genre,
        plot,
        cast
    });

    newMovie.save((err) => {
        if (err) {
            res.render('movies/new-movie');
        } else {
            res.redirect('/movies');
        }
    });
});

router.get('/:id', (req, res, next) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .exec((err, movie) => {
            if (err || !movie) {
                res.render('error');
            } else {
                res.render('movies/movie-details', { movie });
            }
        });
});

router.post('/:id/delete', (req, res, next) => {
    const movieId = req.params.id;

    Movie.findByIdAndRemove(movieId)
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => {
            res.render('error');
        });
});

router.get('/:id/edit', (req, res, next) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .exec((err, movie) => {
            if (err || !movie) {
                res.render('error');
            } else {
                Celebrity.find({}, (err, celebrities) => {
                    if (err) {
                        res.render('error');
                    } else {
                        res.render('movies/edit-movie', { movie, celebrities });
                    }
                });
            }
        });
});


router.post('/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(
        movieId,
        { title, genre, plot, cast },
        { new: true }
    )
        .then(() => {
            res.redirect(`/movies/${movieId}`);
        })
        .catch((err) => {
            res.render('error');
        });
});

module.exports = router;
