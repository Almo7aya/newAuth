const router = require('express').Router();

const UserModel = require('../models/User');

const { isAuth } = require('../utils/ensureAuth');


router.get('/', isAuth, (req, res, next) => {


    res.render('secret', {
        msg: 'Hello ' + req.user.name,
        title: 'Secrets',
        errors: [],
        secrets: req.user.secrets
    });
});


module.exports = router;
