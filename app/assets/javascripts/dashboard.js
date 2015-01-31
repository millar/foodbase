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

  .controller('DashboardIndexController', ['$scope', '$http', '$timeout', 'ScheduledMeal',
    function($scope, $http, $timeout, ScheduledMeal) {
      $scope.requireLogin();

      $scope.meal = {};
      $scope.selectedMeal = {portions: 10};

      $http.get('/api/dashboard').success(function(obj){
        $scope.now = moment(obj.now);
        $scope.scheduledMeals = moment(obj.scheduled_meals);

        $scope.days = $.map([0, 1, 2, 3, 4], function(offset){
          var moment = $scope.now.clone().add(offset, "d");
          var date = moment.format('YYYY-MM-DD');
          return {
            moment: moment,
            date: date
          }
        });

        $scope.loaded = true;

        $timeout(function(){
          $('.day').click(function(e){
            if ($scope.interactive){
              var $this = $(this);
              $scope.targetDay = $this.data('day');
              // e.preventDefault();

              $scope.$apply();

              $timeout(function(){
                $this.find('.blank-input').focus()
              });
            }
          });
        });
      });

      $scope.addMeal = function(){
        $scope.interactive = true;
      }

      $scope.cancelInteraction = function(){
        $scope.interactive = false;
        $scope.targetDay = null;
      }

      $scope.saveMeal = function(){
        if ($scope.selectedMeal.title != $scope.meal.title){
          return false;
        }

        new ScheduledMeal({date: $scope.targetDate, meal: $scope.meal.id}).$save(function(scheduledMeal){
          $scope.cancelInteraction();
          scheduledMeals.push(scheduledMeal);
        });
      }

      $scope.$on('$destroy', function(){
        $('.day').unbind();
      });
    }])
