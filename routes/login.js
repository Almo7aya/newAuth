const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/User');


router.get('/',(req, res, next) => {
    res.render('login', {
        msg: '',
        errors: [],
        title: 'Login'
    });
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.getUserById(id).then(userDetails => {
        done(null, userDetails);
    }).catch(done)
});

passport.use(new LocalStrategy((username, password, done) => {

    if (!(username && password)) return done(null, false);

    UserModel.getUserByUsername(username).then(userDetails => {
        if (!userDetails) return done(null, false);
        UserModel.comparePassword(password, userDetails.password).then(isMatch => {
            if (isMatch) {
                return done(null, userDetails);
            } else {
                return done(null, false);
            }
        }).catch(done);
    }).catch(done);

}));

router.post('/', [
        check('username').isLength({min: 1}).withMessage('Where is Username'),
        check('password').isLength({min: 1}).withMessage('Where is password'),
    ], passport.authenticate('local', {
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
