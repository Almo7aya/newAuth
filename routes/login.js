const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.end('login');
});


module.exports = router;
