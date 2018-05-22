(function(){
  'use strict';

  angular
    .module('register')
    .controller('RegisterController', ['UserService', '$location', 'AuthenticationService',
    function(UserService, $location, AuthenticationService) {
      var self = this;

      var successRegister = function(response){
        self.dataLoading = false;
        AuthenticationService.SetCredentials(self.user.firstName, response.data.userId, response.data.token);
        $location.path('/users');
      }

      var errorRegister = function(data){
        console.log('error', data);
        self.dataLoading = false;
      }

      self.register = function(){
        self.dataLoading = true;
        UserService.Create(self.user, successRegister, errorRegister);
      }

      self.$onInit = function(){
        self.user = {
          firstName: "",
          lastName: "",
          username: "",
          password: ""
        };
        self.dataLoading = false;
      }
    }]);
})()
