const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.end('secret');
});


module.exports = router;
