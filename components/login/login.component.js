(function () {
  'use strict';

    var module = angular.module('login', []);

    module.component('login', {
        templateUrl: '/components/login/login.template.html',
        controller: 'LoginController',
        bindings: {}
    });
})();
