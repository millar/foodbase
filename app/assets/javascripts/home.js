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

  .controller('HomeIndexController', ['$scope', 'Food',
    function($scope, Food) {
      // $scope.latestFoods = Food.query({limit: 6}, function(){
      //   $scope.loaded = true;
      // });
    }])
