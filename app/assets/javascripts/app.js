window.$app = {};

window.$app.registry = [
  'templates',
  'ngRoute',
  'ngAnimate',

  'directives',
  'services'
];

angular.module('app', window.$app.registry)
  .config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $location, $httpProvider, $cookieStoreProvider){
      $routeProvider
        .otherwise({
          template: "Not found"
        });

      $location.html5Mode(true).hashPrefix('!');

      $httpProvider.defaults.headers.common['X-CSRF-Token'] = function(){
        match = document.cookie.match(new RegExp("XSRF-TOKEN" + '=([^;]+)'));
        if (match){
          return decodeURIComponent(match[1]);
        }
      }
    }])

  .controller('MainController', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
      $scope.logout = function(){
        $http.delete('/api/users/sign_out.json', {})
          .success(function(){
            $rootScope.current_user = null;
            $rootScope.current_player = null;
            $location.path('/');
          })
      }

      $rootScope.requireLogout = function(){
        if ($scope.current_user) $location.path('/home');
      }

      $rootScope.requireLogin = function(){
        if (!$scope.current_user) $location.path('/login');
      }
    }])

  .run(['$rootScope',
    function($rootScope){
      $rootScope.defaultTitle = $('title').text();
      $rootScope.current_user = window.$app.current_user;
    }])
