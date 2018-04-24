const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    secrets: [
        String
    ]
});

const UserModel = mongoose.model('user', userSchema);

// add UserModel functions Promise base

UserModel.registerUser = function (userDetails) {
    return new Promise((resolve, reject) => {
        // hash the password
        const userpassword = userDetails.password;
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(userpassword, salt).then(hashedPassword => {
                userDetails.password = hashedPassword;
                this.create(userDetails).then(resolve)
                    .catch(reject);
            }).catch(reject)
        }).catch(reject);
    });
};

UserModel.getUserByUsername = function (username) {
    return this.findOne({username: username})
};

UserModel.getUserById = function (userId) {
    return this.findById(userId);
};

UserModel.comparePassword = function(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = UserModel;
