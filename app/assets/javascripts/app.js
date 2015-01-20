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

  .controller('MainController', ['$scope',
    function($scope){

    }])

  .run(['$rootScope',
    function($rootScope){
      $rootScope.defaultTitle = $('title').text();
    }])
