(function () {
  'use strict';

    var module = angular.module('home', []);

    module.component('home', {
        templateUrl: '/components/home/home.template.html',
        controller: 'HomeController',
        bindings: {}
    });
})();
