(function(){
  'use strict';

  angular
    .module('login')
    .controller('LoginController', ['AuthenticationService', '$location',
     function(AuthenticationService, $location) {
      var self = this;

      var successLogin = function(data){
        self.dataLoading = false;
        AuthenticationService.SetCredentials(data.firstName, data.userId, data.token);
        $location.path('/users');
      }

      var errorLogin = function(data){
        console.log('error', data);
        self.dataLoading = false;
      }

      self.login = function(){
        self.dataLoading = true;
        AuthenticationService.Login(self.userAuth.username, self.userAuth.password, successLogin, errorLogin);
      }

      self.$onInit = function(){
        AuthenticationService.ClearCredentials();
        self.userAuth = {
          username: "",
          password: ""
        };      
        self.dataLoading = false;
      }
    }]);
})()
