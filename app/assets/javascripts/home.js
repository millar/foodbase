window.$app.registry.push('dashboard');

angular.module('dashboard', [])
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
