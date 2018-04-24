const router = require('express').Router();


router.get('/', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
