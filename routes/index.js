const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home',
        msg: '',
        errors: []
    });
});


module.exports = router;
