(function (angular) {
    'use strict';
    var cartModel = angular.module('Cart.Model', ['Items.Model']);
    cartModel.factory('Cart',
        function (Items) {
            var currentData = '',
                localStorageKey = 'MasalaAndSpices',
                cachedCartItemById; // cached quantity of items by id

            function CartModel() {
                this.itemsById = {};
                this.totalItems = 0;
                this.totalPrice = 0;
            }

            CartModel.prototype = (function () {
                function addItem(id, item) {
                    //adding one item to cart
                    item.quantity = 1;
                    this.itemsById[id] = item;
                    this.totalItems++;
                    this.totalPrice += item.price;
                    cachedCartItemById = cachedCartItemById || {};
                    cachedCartItemById[id] = 1;
                    localStorage.setItem(localStorageKey, JSON.stringify(cachedCartItemById));
                }
                function removeItem(id) {
                    var item = this.itemsById[id];
                    this.totalPrice -= (item.price * item.quantity);
                    this.totalItems--;
                    delete this.itemsById[id];
                    delete cachedCartItemById[id];
                    localStorage.setItem(localStorageKey, JSON.stringify(cachedCartItemById));
                }
                function getItemsFromCache() {
                    var self = this;
                    cachedCartItemById = JSON.parse(localStorage.getItem(localStorageKey));
                    if (cachedCartItemById) {
                        var items = Items().getCurrentInstance();
                        angular.forEach(cachedCartItemById, function (itemQuantity, id) {
                            self.itemsById[id] = items.itemsById[id];
                            self.itemsById[id].quantity = itemQuantity;
                            self.totalItems += 1;
                            self.totalPrice += items.itemsById[id].price * itemQuantity;
                        });
                    }
                    
                }
                return {
                    addItem: addItem,
                    removeItem: removeItem,
                    getItemsFromCache: getItemsFromCache
                };
            })();

            var manipulator = {
                getNewInstance: function () {
                    var ci = new CartModel();
                    currentData = ci;
                    return ci;

                },
                getCurrentInstance: function () {
                    return currentData;
                }
            };

            return function () {
                return manipulator;
            };
        }
    );
})(angular);
