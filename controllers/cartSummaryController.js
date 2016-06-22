(function() {
  var cartSummary = angular.module('cartSummary.controller', ['Cart.Model']);
  
  cartSummary.controller('cartSummaryController', function($scope, Cart){
  	$scope.cart = Cart().getCurrentInstance();
  });

})();