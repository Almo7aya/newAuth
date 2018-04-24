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
    check('repassword').custom((value, {req, loc, path}) => {
        if (value !== req.body.password) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }).withMessage('password is not equal'),
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

    const userDetails = req.body;
    userDetails.secrets = [userDetails.secret];
    delete userDetails.secret;
    const newUser = new UserModel(userDetails);
    UserModel.registerUser(newUser).then(doc => {
        console.log('User Registered');
        res.redirect('/login');
    }).catch(next);
});

module.exports = router;
