(function(){
  'use strict';

  angular
    .module('home')
    .controller('HomeController', ['UserService', '$rootScope', '$location',
     function(UserService, $rootScope, $location) {
      var self = this;

      var success = function(response){
        self.dataLoading = false;
        self.users = response.data.users
      }

      var error = function(data){
        console.log('error', data);
        self.dataLoading = false;
        if(data.status = 403){
          $location.path('/login');
        }
      }

      var getUsers = function(){
        self.dataLoading = true;
        UserService.GetAll(success, error);
      }

      self.deleteUser = function(userId){
        if(self.currentUser.userId == userId){
          console.log('No puedes borrar el usuario logueado');
          return
        }
        UserService.Delete(userId,
          function(response){
            getUsers();
          },
          function(data){
            console.log('error', data);
            self.dataLoading = false;
            if(data.status = 403){
              $location.path('/login');
            }
          })
      }

      self.$onInit = function(){
        getUsers();
        self.currentUser = $rootScope.globals.currentUser;
      }
    }]);
})()
