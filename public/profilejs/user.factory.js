angular.module('Users')
    .factory('usersFactory', usersFactory);

usersFactory.$inject = ['$http'];

function usersFactory($http) {

    return {

        createUser: function(userData) {
            return $http.post('/api/users', userData);
        },

        getUser: function(userID) {
            userID = userID ? '/' + userID : '';
            return $http.get('/api/users' + userID);
        },
        getMe: function(meData) {
            return $http.get('/api/me');
        }
    };
}
