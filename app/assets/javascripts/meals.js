window.$app.registry.push('meals');

angular.module('meals', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/meals/new', {
          templateUrl: 'meals/new.html',
          controller: 'MealsNewController'
        }).
        when('/meals', {
          templateUrl: 'meals/index.html',
          controller: 'MealsIndexController'
        });
    }])

  .controller('MealsIndexController', ['$scope', '$http', 'Meal',
    function($scope, $http, Meal) {
      $scope.requireLogin();

      // $scope.meals = Meal.query(function(meals){
      //
      // });
    }])

  .controller('MealsNewController', ['$scope', '$http', 'Meal',
    function($scope, $http, Meal) {
      $scope.requireLogin();

      $scope.meal = {
        ingredients: [{}, {}, {}]
      };
    }])
