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
          return ingredient;
        });
      };
    }])

  .controller('MealsShowController', ['$scope', '$http', '$routeParams', 'Meal',
    function($scope, $http, $routeParams, Meal) {
      $scope.meal = Meal.get({id: $routeParams.id}, function(){$scope.loaded = true});

      $scope.togglePublic = function(){
        $scope.meal.$update({public: !$scope.meal.public}, function(){
          $scope.meal.public = !$scope.meal.public;
        })
      };

      $scope.delete = function(){
        $scope.meal.$delete(function(){
          $scope.meal.active = false;
        })
      };

      $scope.restore = function(){
        $scope.meal.$restore(function(){
          $scope.meal.active = true;
        })
      };
    }])

  .controller('MealsNewController', ['$scope', '$http', 'Meal', '$location', '$timeout',
    function($scope, $http, Meal, $location, $timeout) {
      $scope.requireLogin();

      $scope.meal = {
        public: true,
        ingredients: [{}, {}, {}]
      };

      $scope.removeIngredient = function(idx){
        $scope.meal.ingredients.splice(idx, 1);

        if (!$scope.meal.ingredients.length){
          $scope.meal.ingredients[0] = {};
        }
      };

      $scope.addIngredient = function(){
        $scope.meal.ingredients.push({});
        $timeout(function(){
          $('#ingredient_name_'+($scope.meal.ingredients.length-1)).focus();
        });
      };

      $scope.save = function(){
        new Meal($scope.meal).$save(function(meal){
          $location.path('/meals/'+meal.id);
        });
      };

    }])

  .controller('MealsEditController', ['$scope', '$http', '$routeParams', 'Meal', '$location', '$timeout',
    function($scope, $http, $routeParams, Meal, $location, $timeout) {
      $scope.requireLogin();

      $scope.meal = Meal.get({id: $routeParams.id}, function(meal){
        $scope.loaded = true;
        $scope.mealTitle = meal.title;
      });

      $scope.removeIngredient = function(idx){
        $scope.meal.ingredients.splice(idx, 1);

        if (!$scope.meal.ingredients.length){
          $scope.meal.ingredients[0] = {};
        }
      };

      $scope.addIngredient = function(){
        $scope.meal.ingredients.push({});
        $timeout(function(){
          $('#ingredient_name_'+($scope.meal.ingredients.length-1)).focus();
        });
      };

      $scope.save = function(){
        $scope.meal.$update(function(){
          $location.path('/meals/'+$scope.meal.id);
        });
      };

    }])
