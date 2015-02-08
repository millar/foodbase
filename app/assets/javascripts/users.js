window.$app.registry.push('users');

angular.module('users', [])
  .config(['$routeProvider',
    function($routeProvider){
      $routeProvider
        .when('/register', {
          templateUrl: 'users/registrations/new.html',
          controller: 'UsersRegistrationsNewController'
        })
        .when('/login', {
          templateUrl: 'users/sessions/new.html',
          controller: 'UsersSessionsNewController'
        })
    }])

  .controller('UsersRegistrationsNewController', ['$scope', '$http', '$rootScope', '$location',
    function($scope, $http, $rootScope, $location) {
      $scope.requireLogout();

      $scope.save = function() {
        $scope.saved = true;

        if ($scope.userForm.$valid) {
          $http.post('/api/users.json', {user: $scope.user})
            .success(function(user){
              $rootScope.current_user = user;
              $location.path('/home');

              $scope.removeAlert('preview-release');
              $scope.alert({
                name: 'login-status',
                body: "Welcome to Foodbase, " + user.username + '.',
                css: "alert-success"
              });
            })
            .error(function(response){
              $scope.errors = response.errors;
            })
        }
      }
    }])

  .controller('UsersSessionsNewController', ['$scope', '$http', '$rootScope', '$location',
    function($scope, $http, $rootScope, $location) {
      $scope.requireLogout();

      $scope.submit = function() {
        $http.post('/api/users/sign_in.json', {user: $scope.user})
          .success(function(user){
            $rootScope.current_user = user;

            $location.path('/home');

            $scope.removeAlert('preview-release');
            $scope.alert({
              name: 'login-status',
              body: "Welcome back " + user.username + '.',
              css: "alert-success"
            });
          })
          .error(function(response){
            $scope.failed = true;
            $scope.user.password = "";
          })
      }
    }])

  // .controller('UsersShowController', ['$scope', '$http', '$rootScope', 'User', '$routeParams',
  //   function($scope, $http, $rootScope, User, $routeParams) {
  //     $scope.user = User.get({username_lower: $routeParams.id}, function(user){
  //       $scope.loaded = true;
  //     }, function(error){
  //       if (error.status == 404){
  //         $scope.notFound = true;
  //       }
  //     })
  //   }])
