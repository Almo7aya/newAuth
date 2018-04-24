const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.end('index');
});


module.exports = router;
