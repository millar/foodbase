window.$app.registry.push('home');

angular.module('home', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/', {
          templateUrl: 'home/index.html',
          controller: 'HomeIndexController'
        });
    }])

  .controller('HomeIndexController', ['$scope',
    function($scope) {

    }])
