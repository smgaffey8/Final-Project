var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    fname: String,
    lname: String,
    phone: String,
    city: String,
    state: String,
    highschool: String,
    graduation: Number,
    team: String,
    player: String,
    GPA: Number,
    SAT: Number,
    ACT: Number,
    created: Number // Date.now()
});


// module.exports = mongoose.model('User', userSchema, 'users');
