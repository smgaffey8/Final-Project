var Auth = require('./controllers/auth.js');
var Auth1 = require('./controllers/auth1.js');
var Profile = require('./controllers/profile.js');

module.exports = function(app) {
    // SITE ROOT
    app.get('/', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        res.sendFile('home.html', {
            root: './public/html'
        });
    });
    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out
    // app.get('/api/players/:id', Users.get);

    app.post('/login', Auth.login); // form request emdpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration

    app.get('/login', Auth1.render); // route for the login page
    app.get('/logout', Auth1.logout); // route for logging out

    app.post('/login', Auth1.login); // form request endpoint for loggin in
    app.post('/register1', Auth1.register); // form request endpoint for coach registration

    app.post('/api/users', Profile.create);
    app.get('/api/users', Profile.get);
    app.get('/api/users/:id', Profile.get);
    app.get('/api/me', Profile.me);

    // DAHSBOARD
    app.all('/dashboard*', Auth.session); // protect all dashboard routes from unauthorized users
    app.get('/dashboard', (req, res) => { // renders the dashboard, break this out into another controller if needed!
        res.render('dashboard', req.session);
    });
    // app.all('/dashboard*', Auth1.session); // protect all dashboard routes from unauthorized users
    // app.get('/dashboard', (req, res) => { // renders the dashboard, break this out into another controller if needed!
    //     res.render('dashboard', req.session);
    // });
};
