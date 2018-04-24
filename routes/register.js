const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('register', {
        msg: '',
        title: 'Register'
    });
});


module.exports = router;
