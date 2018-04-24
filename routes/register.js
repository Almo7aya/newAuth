const router = require('express').Router();

const UserModel = require('../models/User');

router.get('/', (req, res, next) => {
    res.render('register', {
        msg: '',
        title: 'Register'
    });
});

router.post('/', (req, res, next) => {
    res.json(req.body);
});

module.exports = router;
