(function() {
  var itemsService = angular.module('Items.Service', []);

  itemsService.factory('ItemsService', function($http){
    return {
      get: function () {
          return $http.get('json/masalaStore.json');
      }
    };
  });

})();