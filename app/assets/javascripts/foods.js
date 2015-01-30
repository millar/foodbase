window.$app.registry.push('foods');

angular.module('foods', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        // when('/foods/new', {
        //   templateUrl: 'foods/new.html',
        //   controller: 'FoodsNewController'
        // }).
        when('/foods/:id', {
          templateUrl: 'foods/show.html',
          controller: 'FoodsShowController'
        }).
        when('/foods', {
          templateUrl: 'foods/index.html',
          controller: 'FoodsIndexController'
        });
    }])

  .controller('FoodsIndexController', ['$scope', '$http', 'Food',
    function($scope, $http, Food) {
      $scope.foods = Food.query(function(){
        $scope.loaded = true;
      })
    }])

  .controller('FoodsShowController', ['$scope', '$http', '$routeParams', 'Food',
    function($scope, $http, $routeParams, Food) {
      $scope.food = Food.get({id: $routeParams.id}, function(){$scope.loaded = true});
    }])
