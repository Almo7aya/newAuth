const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');

const UserModel = require('../models/User');

router.get('/', (req, res, next) => {
    res.render('register', {
        msg: '',
        title: 'Register',
        errors: []
    });
});

router.post('/', [
    check('name').isLength({min: 1}).withMessage('Where is Name'),
    check('username').isLength({min: 1}).withMessage('Where is Username'),
    check('email').isEmail().withMessage('Where is username').normalizeEmail(),
    check('password').isLength({min: 1}).withMessage('Where is password'),
    check('repassword').equals('password').withMessage('password is not equal'),
    check('secret').isLength({min: 1}).withMessage('Where is secret'),

], (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('register', {
            title: 'Register',
            msg: 'errors',
            errors: errors.array()
        });
    }

    res.json(req.body);
});

module.exports = router;
