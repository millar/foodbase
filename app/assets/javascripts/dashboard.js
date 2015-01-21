window.$app.registry.push('home');

angular.module('home', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/home', {
          templateUrl: 'dashboard/index.html',
          controller: 'DashboardIndexController'
        });
    }])

  .controller('DashboardIndexController', ['$scope',
    function($scope) {
      $scope.requireLogin();
    }])
