(function () {
    'use strict';

    angular
        .module('services')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {},
          baseUrl = 'http://localhost:3000';

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, success, error) {
            $http.post(baseUrl + '/api/authenticate', { username: username, password: password })
               .then(
                 function (response) {
                   success(response.data);
                 },
                 function(responseError){
                   error(responseError.data)
                 });
        }

        function SetCredentials(firstName, userId, token) {
            $rootScope.globals = {
                currentUser: {
                    firstName: firstName,
                    userId: userId,
                    token: token
                }
            };
            // set default auth header for http requests
            $http.defaults.headers['Authorization'] = 'Basic ' + token;
            $cookies.putObject('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }



})();
