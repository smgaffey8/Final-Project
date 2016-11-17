var coach = require('../models/coach1.js'),
    bcrypt = require('bcryptjs'), // used for encryption
    errors = { // response errors
        general: {
            status: 500,
            message: 'Backend error'
        },
        coachs: {
            duplicate: {
                status: 409,
                message: 'coach already exists!'
            }
        },
        login: {
            status: 403,
            message: 'Invalid coachname or password'
        }
    },
    messages = {
        login: {
            status: 200,
            message: 'Login success'
        },
        register: {
            status: 200,
            message: 'Register success'
        }
    };

module.exports = {
    render: (req, res) => {
        if (req.session.uid) {
            return res.redirect('/dashboard'); // if the coach already has a session cookie, just place them into the dashboard
        } else {
            res.render('auth1', req.session); // render the auth1enticaiton page (register/login)
        }
    },
    logout: (req, res) => {
        req.session.reset(); // clears the coachs cookie session
        res.redirect('/login');
    },
    login: (req, res) => {
        console.log("login server-side");
        coach.findOne({
            email: req.body.email // sent from the frontend in a POST request
        }, (err, coach) => {
            // If there was an error in mongo, send back a 500 response (general server error) to the Frontend
            if (err) {
                console.error('MongoDB error:', err);
                res.status(500).send(errors.general);
            }
            if (!coach) {
                // If there was no coach found for the given coach name, send back a 403 response (forbidden)
                res.status(403).send(errors.login);
            } else {
                console.info('auth1.login.coach =', coach);
                // If we got this far, then we know that the coach exists. But did they put in the right password?
                bcrypt.compare(req.body.password, coach.password, (bcryptErr, matched) => {
                    if (bcryptErr) {
                        console.error('Error decrypting password:', bcryptErr);
                        res.status(500).send(errors.general);
                    } else if (!matched) {
                        console.warn('Passwords do not match for:', coach);
                        res.status(403).send(errors.login);
                    } else {
                        req.session.uid = coach._id; // set the coach in the session!
                        res.send(messages.login); // send a success message
                    }
                });
            }
        });
    },
    register: (req, res) => {
        var newCoach = new Coach(req.body);

        newCoach.save((err, coach) => {
            if (err) {
                console.error('#ERROR#'.bold.red, err.message);
                if (err.code === 11000) {
                    res.status(errors.coachs.duplicate.status)
                        .send(errors.coachs.duplicate);
                } else {
                    res.status(errors.general.status)
                        .send(errors.general);
                }
            } else {
                req.session.uid = coach._id; // set the coach in the session!
                res.send(messages.register); // send a success message
            }
        });
    },
    session: (req, res, next) => {
        if (req.session.uid) {
            next();
        } else {
            res.redirect('/login');
        }
    }
};
