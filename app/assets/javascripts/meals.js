window.$app.registry.push('meals');

angular.module('meals', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/meals/new', {
          templateUrl: 'meals/new.html',
          controller: 'MealsNewController'
        }).
        when('/meals/:id/edit', {
          templateUrl: 'meals/edit.html',
          controller: 'MealsEditController'
        }).
        when('/meals/:id', {
          templateUrl: 'meals/show.html',
          controller: 'MealsShowController'
        }).
        when('/meals', {
          templateUrl: 'meals/index.html',
          controller: 'MealsIndexController'
        });
    }])

  .controller('MealsIndexController', ['$scope', '$http',
    function($scope, $http) {
      $scope.requireLogin();

      $http.get('/api/users/me/meals').success(function(meals){
        $scope.meals = meals;
        $scope.loaded = true;
      });

      $scope.topIngredients = function(meal){
        return $.map(meal.ingredients, function(ingredient){
          return ingredient.food;
        });
      };
    }])

  .controller('MealsShowController', ['$scope', '$http', '$routeParams', 'Meal',
    function($scope, $http, $routeParams, Meal) {
      $scope.meal = Meal.get({id: $routeParams.id}, function(){$scope.loaded = true});
    }])

  .controller('MealsEditController', ['$scope', '$http', '$routeParams', 'Meal',
    function($scope, $http, $routeParams, Meal) {
      $scope.requireLogin();

      $scope.meal = Meal.get({id: $routeParams.id}, function(){$scope.loaded = true});

      $scope.removeIngredient = function(idx){
        $scope.meal.ingredients.splice(idx, 1);

        if (!$scope.meal.ingredients.length){
          $scope.meal.ingredients[0] = {};
        }
      }

      $scope.save = function(){
        $scope.meal.$update();
      };

    }])
