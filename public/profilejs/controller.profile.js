angular.module('Users')
    .controller('userController', userController);

userController.$inject = ['usersFactory'];

function userController(usersFactory) {
    var user = this;
    user.newUser = {};
    user.user = {};
    user.userList = [];
    user.greeting = 'Welcome to the Heroes of AJAX!';

    // heroesFactory.createHero().then

    // user.createUser = function() {
    //     usersFactory.createHero(user.newUser)
    //         .then(function(returnData) {
    //             console.log('Response from server : ', returnData);
    //             user.newUser = {}; // reset the form
    //             user.getUser();
    //         });
    // };

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
}

// function video() {
//     console.log('video upload');
// }
