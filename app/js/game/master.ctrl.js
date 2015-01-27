'use strict';

//controller for single project view
angular.module('app').controller('Master', ['Game', function(Game) {
    console.log('Hi from the Master!');

    var self = this;

    this.allCorrect = false;

    this.selected = 0;

    // watches for any change in the `game state`
    $scope.$watch(Game.getUpdateValues, function(newValue, oldValue, scope) {
        if (newValue && newValue !== oldValue) {
            self.allCorrect = Boolean(newValue.correct);
            self.selected = newValue.selected;
            self.complete = newValue.complete;
        }
    });
}]);

