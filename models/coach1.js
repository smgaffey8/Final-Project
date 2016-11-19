var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10,
    coachSchema1 = new mongoose.Schema({
        name: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
        created: Number // Date.now()
    });

// hash passwords before saving them
coachSchema1.pre('save', function(next) {
    var coach = this;

    // only hash the password if it has been modified (or is new)
    if (!coach.isModified('password')) {
        return next();
    }
    // generate a salt
    bcrypt.genSalt(SALT_INDEX, (saltErr, salt) => {
        if (saltErr) {
            return next(saltErr);
        }
        // hash the password using our new salt
        bcrypt.hash(coach.password, salt, (hashErr, hash) => {
            if (hashErr) {
                return next(hashErr);
            }
            // override the cleartext password with the hashed one
            coach.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Coach', coachSchema1);
