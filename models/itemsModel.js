(function (angular) {
    'use strict';
    var itemsModel = angular.module('Items.Model', ['Items.Service']);
    itemsModel.factory('Items',
        function (ItemsService, $q) {
            var currentData = '';

            function ItemsModel() {
                this.items = [];
            }

            ItemsModel.prototype = (function () {
                function getItems() {
                    var promise = ItemsService.get(),
                        deferred = $q.defer(),
                        self = this;
                    promise.then(function (response) {
                        self.items = response.data.items;
                        deferred.resolve('success');
                    },
                    function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
                return {
                    getItems: getItems
                };
            })();

            var manipulator = {
                getNewInstance: function () {
                    var ci = new ItemsModel();
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
