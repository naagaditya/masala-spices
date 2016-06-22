(function() {
  var itemsStore = angular.module('itemsStore.controller',
  	[
  		'Items.Model',
  		'Cart.Model'
  	]);

  itemsStore.controller('itemsStoreController',
  	function(Items, $scope, Cart){
	  	$scope.cart = Cart().getNewInstance();
	  	$scope.items = Items().getNewInstance();
	  	$scope.items.getItems().then(function() {
	  		$scope.cart.getItemsFromCache();
	  	});
	  	var localStorageKey = 'MasalaAndSpices';
	  	var updateCachedItem = function (itemId) {
	  		var cachedCartItemById = JSON.parse(localStorage.getItem(localStorageKey));
	  		cachedCartItemById[itemId] = $scope.cart.itemsById[itemId].quantity;
	  		localStorage.setItem(localStorageKey, JSON.stringify(cachedCartItemById));
	  	}
	  	$scope.addOne = function (itemId) {
	  		$scope.cart.itemsById[itemId].quantity += 1;
	  		$scope.cart.totalPrice += $scope.cart.itemsById[itemId].price;
	  		updateCachedItem(itemId);
	  	}
	  	$scope.removeOne = function (itemId) {
	  		var itemQuantity = $scope.cart.itemsById[itemId].quantity;
	  		itemQuantity = itemQuantity - 1;
	  		$scope.cart.itemsById[itemId].quantity = itemQuantity;
	  		$scope.cart.totalPrice -= $scope.cart.itemsById[itemId].price;
	  		updateCachedItem(itemId); 
	  		if (!itemQuantity) {
	  			$scope.cart.removeItem(itemId);
	  		}
	  	}

  	}
  );

})();