const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');


router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    const newCelebrity = new Celebrity({
        name,
        occupation,
        catchPhrase
    });

    newCelebrity.save((err) => {
        if (err) {
            res.render('celebrities/new-celebrity');
        } else {
            res.redirect('/celebrities');
        }
    });
});

router.get('/', (req, res, next) => {
    Celebrity.find({}, (err, celebrities) => {
        if (err) {

            res.render('error');
        } else {
            res.render('celebrities/celebrities', { celebrities });
        }
    });
});

module.exports = router;
