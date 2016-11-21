var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10,
    UserSchema = new mongoose.Schema({
        // name: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        fname: String,
        lname: String,
        phone: Number,
        city: String,
        state: String,
        highschool: String,
        graduation: Number,
        team: String,
        Position1: String,
        GPA: Number,
        SAT: Number,
        ACT: Number,
        created: Number // Date.now()

    });

// hash passwords before saving them
UserSchema.pre('save', function(next) {
    var user = this;
    console.log('email validated');
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    // generate a salt
    bcrypt.genSalt(SALT_INDEX, (saltErr, salt) => {
        if (saltErr) {
            return next(saltErr);
        }
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) {
                return next(hashErr);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
