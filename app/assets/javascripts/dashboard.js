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

  .controller('DashboardIndexController', ['$scope', '$http',
    function($scope, $http) {
      $scope.requireLogin();

      $http.get('/api/dashboard').success(function(obj){
        $scope.now = moment(obj.now);

        $scope.days = $.map([0, 1, 2, 3, 4], function(offset){
          return $scope.now.clone().add(offset, "d");
        });

        $scope.loaded = true;
      });

      $scope.addMeal = function(){
        $scope.interactive = true;
      }

      $scope.cancelInteraction = function(){
        $scope.interactive = false;
      }
    }])
