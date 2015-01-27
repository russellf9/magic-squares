(function() {
    'use strict';

    // the `highest` controller the app
    angular.module('app').controller('Master', ['Game', '$scope', function(Game, $scope) {
        var self = this;

        this.allCorrect = false;

        this.selected = 0;

        // watches for any change in the `game state`
        $scope.$watch(Game.getUpdateValues, function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                self.allCorrect = Boolean(newValue.correct);
                self.selected = newValue.selected;
                self.complete = newValue.complete;
            }
        });
    }]);
}());


