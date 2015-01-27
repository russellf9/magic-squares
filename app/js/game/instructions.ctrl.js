(function() {
    'use strict';

    angular.module('app').controller('Instructions', ['Game', 'Text', function(Game, Text) {
        console.log('hi from the instructions!');

        this.instructions = Text.instructions + Game.magicNumber() + '.';
    }]);
}());

