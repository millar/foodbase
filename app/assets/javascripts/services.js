angular.module('services', ['ngResource'])
  .factory('Meal', ['$resource',
    function($resource){
      return $resource('/api/meals/:id', {}, {
        'update': { params: {id:'@id'}, method:'PUT' },
        'delete': { params: {id:'@id'}, method:'DELETE' }
      });
    }])
