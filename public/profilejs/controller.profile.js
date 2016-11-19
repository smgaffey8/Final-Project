angular.module('Users')
    .controller('userController', userController);

homeController.$inject = ['usersFactory'];

function userController(usersFactory) {
    var user = this;
    user.newHero = {};
    user.hero = {};
    user.heroList = [];
    user.greeting = 'Welcome to the Heroes of AJAX!';

    // heroesFactory.createHero().then

    user.createUser = function() {
        usersFactory.createHero(user.newUser)
            .then(function(returnData) {
                console.log('Response from server : ', returnData);
                user.newUser = {}; // reset the form
                user.getUser();
            });
    };

    user.getHero = function(userID) {
        usersFactory.getUser(userID)
            .then(function(returnData) {
                if (returnData.data.length) {
                    // if array (has length), store in heroList
                    user.userList = returnData.data;
                } else {
                    // if not, store in hero
                    user.user = returnData.data;
                }
            });
    };
    user.getUser(); // get many
    // user.getUser("581a2941fba8172b747af12f"); // get one
}
