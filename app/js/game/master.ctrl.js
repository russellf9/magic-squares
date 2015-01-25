'use strict';

//controller for single project view
angular.module('app').controller('Master', ['$scope', '$rootScope', 'Evaluate', function($scope, $rootScope, Evaluate) {
    console.log('hi from the Master!');

    var self = this;

    this.allCorrect = false;

    this.selected = 0;

    // TODO put in Service
    this.instructions = 'Make all the columns, rows and diagonals add up to ' + Evaluate.magicNumber() + '.';

    // watches for any change in the `game state`
    $scope.$watch(Evaluate.getUpdateValues, function(newValue, oldValue, scope) {
        if (newValue && newValue !== oldValue) {
            self.allCorrect = Boolean(newValue.correct);
            self.selected = newValue.selected;
            self.complete = newValue.complete;
        }
    });

    // triggers the watch within the service
    // TODO should really be done within the service, perhaps by IIFE?

    Evaluate.watchSelectedItems();


}]);
