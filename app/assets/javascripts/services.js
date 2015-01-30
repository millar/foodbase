angular.module('services', ['ngResource'])
  .factory('Meal', ['$resource',
    function($resource){
      return $resource('/api/meals/:id/:relative', {}, {
        'update': { params: {id:'@id'}, method:'PUT' },
        'restore': { params: {id:'@id', relative:'restore'}, method:'PUT' },
        'delete': { params: {id:'@id',}, method:'DELETE' }
      });
    }])

  .factory('Food', ['$resource',
    function($resource){
      return $resource('/api/foods/:id', {}, {});
    }])
