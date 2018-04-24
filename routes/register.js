const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.end('register');
});


module.exports = router;
