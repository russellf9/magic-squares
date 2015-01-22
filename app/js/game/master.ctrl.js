'use strict';

//controller for single project view
angular.module('app').controller('Master', ['$scope', function($scope) {
    console.log('hi from the Master!');

    $scope.$on('DRAG.START', function(event, obj) {
        console.log('MASTER -> DRAG.START: ', obj);
    });

}]);
