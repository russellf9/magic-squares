'use strict';

//controller for single project view
angular.module('app').controller('Master', ['$scope', 'Evaluate', function($scope, Evaluate) {
    console.log('hi from the Master!');

    $scope.$on('DRAG.START', function(event, obj) {
        console.log('MASTER -> DRAG.START: ', obj);
    });

    var self = this;

    self.allCorrect = 'no';


    $scope.$watch(Evaluate.getCorrect, function(newValue, oldValue, scope) {
        if (newValue && newValue !== oldValue) {
            console.log('newvalue: ',newValue);
            self.allCorrect = String(newValue.correct);
        }
    });
}]);
