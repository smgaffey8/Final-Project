angular.module('module.auth1', []) // declaring an angular module
    .controller('module.auth1.controller', auth1); // chaining a controller

auth1.$inject = ['$http']; // injecting the $http service

function auth1($http) { // auth1 controller constructor function
    console.info("auth1.controller:loaded");

    var auth1 = this,
        alertError = ['alert', 'alert-danger'];

    auth1.payload = {};

    auth1.login = {
        submit: function($event) {
            console.debug('Login.submit');
            $http.post('/login', auth1.payload).then(auth1.login.success, auth1.login.error);
        },
        success: function(res) {
            // when login is successful, redirect them into the dashboard
            console.info('auth1.login.success');
            location.href = "/dashboard";
        },
        error: function(err) {
            console.error('Login.error');
            auth1.login.alert = alertError;
            auth1.login.message = err.data && err.data.message || 'Login failed!';
        }
    };
    auth1.register = {
        submit: function($event) {
            $http.post('/register', auth1.payload).then(auth1.register.success, auth1.register.error);

            // function validateEmail(uemail1) {
            var emailRegEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.[Ee][Dd][Uu]$/;
            if (document.form1.email1.value.search(emailRegEx) == -1) {
                alert("Please enter a .edu email address.");
                // document.form1.email1.focus();
                console.log("stay on register page");
                return false;
            }
            return true;
            // }

        },
        success: function(res) {
            // when register is successful, also redirect them into the dashboard (already logged in, [req.session.user] on the backend)
            console.info('auth1.register.success');
            location.href = "/dashboard";
        },
        error: function(err) {
            console.error('Register:error', err);
            auth1.register.alert = alertError;
            auth1.register.message = err.data && err.data.message || 'Registration failed!';
        }
    };
}
