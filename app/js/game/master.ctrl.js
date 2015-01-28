(function() {
    'use strict';

    // the `highest` controller the app
    angular.module('app').controller('Master', ['Game', '$scope', function(Game, $scope) {
        var self = this;

        this.allCorrect = false;

        this.selected = 0;

        this.checked = false;

        this.complete = false;

        // watches for any change in the `game state`
        $scope.$watch(Game.getUpdateValues, function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                self.allCorrect = Boolean(newValue.correct);
                self.selected = newValue.selected;
                self.complete = newValue.complete;
                if (!self.complete) {
                    self.checked = false;
                }
                else if(self.complete && self.checked) {
                    self.checked = false;
                }
            }
        });

        // a utility which returns every third element
        this.mod3 = function(elm) {
            return !(elm.value % 3);
        };

        // user function which to display the completed values
        this.check = function() {
            this.checked = true;
        };
        /**
         * Resets the game
         */
        this.clear = function() {
            Game.clear();
        };
    }]);
}());


