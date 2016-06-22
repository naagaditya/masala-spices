(function (angular) {
    'use strict';
    var cartModel = angular.module('Cart.Model', []);
    cartModel.factory('Cart',
        function () {
            var currentData = '', localStorageKey = 'MasalaAndSpices';

            function CartModel() {
                var localStorageItems = localStorage.getItem(localStorageKey);
                this.itemsById = {};
                this.totalItems = 0;
                this.totalPrice = 0;
                if (localStorageItems) {
                    var jsonItems = JSON.parse(localStorageItems);
                    this.itemsById = jsonItems.itemsById || {};
                    this.totalItems = jsonItems.totalItems || 0;
                    this.totalPrice = jsonItems.totalPrice || 0;
                }
            }

            CartModel.prototype = (function () {
                function addItem(id, item) {
                    //adding one item to cart
                    item.quantity = 1;
                    this.itemsById[id] = item;
                    this.totalItems++;
                    this.totalPrice += item.price;
                    localStorage.setItem(localStorageKey, JSON.stringify(this));
                }
                function removeItem(id) {
                    var item = this.itemsById[id];
                    this.totalPrice -= (item.price * item.quantity);
                    this.totalItems--;
                    delete this.itemsById[id];
                    localStorage.setItem(localStorageKey, JSON.stringify(this));
                }
                return {
                    addItem: addItem,
                    removeItem: removeItem
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
