const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('secret', {
        msg: '',
        title: 'Secrets',
        errors: []
    });
});


module.exports = router;
