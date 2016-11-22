var app = angular.module('Users')
    .controller('userController', userController);

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

userController.$inject = ['usersFactory', '$http', '$sce'];

function userController(usersFactory, $http, $sce) {
    var user = this;
    window.user = user;
    user.newUser = {};
    user.user = {};
    user.userList = [];
    user.greeting = 'Welcome to the Heroes of AJAX!';
    user.newSubmission = {};
    user.submissions = [];

    user.getMe = function() {
        usersFactory.getMe()
            .then(function(meData) {
                console.log("return data ", meData);
                if (meData.data.length) {
                    // if array (has length), store in heroList
                    user.userList = meData.data;
                } else {
                    // if not, store in hero
                    user.user = meData.data;
                }
            }, function(err) {
                console.log('Error', err);
            });

    };

    user.addSubmission = function() {
        var expressionURL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regexURL = new RegExp(expressionURL);
        if ($cookies.get('submitted')) {
            console.log('You Already Voted!');
            alert("You already made a submission!");
            return;
        } else if (user.newSubmission.url.match(regexURL)) {

            user.newSubmission.url = user.newSubmission.url.replace("watch?v=", "embed/");
            user.newSubmission.votes = 0;
            $('#myModal').modal('hide');
            $http.post('/api/submissions', user.newSubmission);
            user.newSubmission = {};
            user.getSubmissions();
        } else {
            alert("Not a valid URL");
        }
    };
    user.getSubmissions = function() {
        $http.get('/api/submissions')
            .then(function(response) {
                console.log("The response data:", response.data);
                user.submissions = response.data;

            });
    };

    user.removeSubmission = function(submission) {
        var removeIndex = user.submissions.indexOf(submission);
        $http.delete('/api/submissions/' + removeIndex)
            .then(function(response) {
                user.getSubmissions();
            });
    };
    user.getSubmissions();
}
