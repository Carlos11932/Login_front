(function () {
    'use strict';

    angular
        .module('services')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$location', '$rootScope'];
    function UserService($http, $location, $rootScope) {
        var service = {},
          baseUrl = 'http://localhost:3000';

        service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;

        return service;

        function getToken(){
          return $rootScope.globals.currentUser ? $rootScope.globals.currentUser.token : undefined;
        }

        function GetAll(success, error) {
            return $http.get(baseUrl + '/api/users', {headers: {'Authorization': 'Basic ' + getToken()}}).then(success, error);
        }

        function Create(user, success, error) {
            return $http.post(baseUrl + '/api/users', user).then(success, error);
        }

        function Delete(id, success, error) {
            return $http.delete(baseUrl + '/api/users/' + id,  {headers: {'Authorization': 'Basic ' + getToken()}}).then(success, error);
        }

    }

})();
