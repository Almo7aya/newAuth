module.exports = {
    isAuth: (req, res, next) => {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.status(401).redirect('/login');
        }
    }
};
