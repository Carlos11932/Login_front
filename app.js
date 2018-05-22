(function () {
    'use strict';

    angular
      .module('app', ['ngRoute', 'ngCookies', 'services', 'login', 'register', 'home'])
      .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
          $routeProvider
              .when('/users', {
                template: '<home></home>'
              })
              .when('/login', {
                template: '<login></login>'
              })
              .when('/register', {
                template: '<register></register>'
              })
              .otherwise({ redirectTo: '/login' });

         }])
        .run(['$rootScope', '$location', '$cookieStore', '$http',
          function ($rootScope, $location, $cookieStore, $http) {
            // Mantenemos al usuario identificado al refrescar
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.token; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirigimos a la pagina de login
                var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            });
        }]);
})();
