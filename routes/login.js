const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res, next) => {
    res.render('login', {
        msg: '',
        errors: [],
        title: 'Login'
    });
});

passport.use(new LocalStrategy());

router.post('/', [
        check('username').isLength({min: 1}).withMessage('Where is Username'),
        check('password').isLength({min: 1}).withMessage('Where is password'),
    ], passport.Authenticator('local' ,{
        successRedirect: '/secret',
        failureRedirect: '/login'
    })
    , (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('login', {
                title: 'Login',
                msg: 'errors',
                errors: errors.array()
            });
        }

    });

module.exports = router;
