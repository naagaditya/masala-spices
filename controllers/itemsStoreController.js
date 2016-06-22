(function() {
  var itemsStore = angular.module('itemsStore.controller',
  	[
  		'Items.Model',
  		'Cart.Model'
  	]);

  itemsStore.controller('itemsStoreController',
  	function(Items, $scope, Cart){
	  	$scope.items = Items().getNewInstance();
	  	$scope.cart = Cart().getNewInstance();
	  	$scope.items.getItems();
	  	var localStorageKey = 'MasalaAndSpices';
	  	$scope.addOne = function (itemId) {
	  		$scope.cart.itemsById[itemId].quantity += 1;
	  		$scope.cart.totalPrice += $scope.cart.itemsById[itemId].price;
	  		localStorage.setItem(localStorageKey, JSON.stringify($scope.cart)); 
	  	}
	  	$scope.removeOne = function (itemId) {
	  		var itemQuantity = $scope.cart.itemsById[itemId].quantity;
	  		itemQuantity = itemQuantity - 1;
	  		$scope.cart.itemsById[itemId].quantity = itemQuantity;
	  		$scope.cart.totalPrice -= $scope.cart.itemsById[itemId].price;
	  		localStorage.setItem(localStorageKey, JSON.stringify($scope.cart));  
	  		if (!itemQuantity) {
	  			$scope.cart.removeItem(itemId);
	  		}
	  	}

  	}
  );

})();