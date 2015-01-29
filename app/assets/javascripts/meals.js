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

      $scope.removeIngredient = function(idx){
        $scope.meal.ingredients.splice(idx, 1);

        if (!$scope.meal.ingredients.length){
          $scope.meal.ingredients[0] = {};
        }
      }

      $scope.save = function(){
        new Meal($scope.meal).$save();
      };

    }])
