(function () {
  'use strict';

    var module = angular.module('register', []);

    module.component('register', {
        templateUrl: '/components/register/register.template.html',
        controller: 'RegisterController',
        bindings: {}
    });
})();
