(function() {

    'use strict';

    /**
     * A service which evaluates the games business logic
     */
    angular.module('app').service('Game', ['_', '$rootScope', function(_, $rootScope) {

        var _numberOfSquares = 9,
            _grandTotal = 45,
            _selectedItems = [],
        // true if a correct solution has been found
            _allCorrect = false,
            _gameValues = {},

            game = {
                numberOfSquares: function() {
                    return _numberOfSquares;
                },
                grandTotal: function() {
                    return _grandTotal;
                },
                magicNumber: function() {
                    return _grandTotal / 3;
                },
                setSelectedItems: function(value) {
                    _selectedItems = value;
                },
                selectedItems: function() {
                    return _selectedItems;
                },
                allCorrect: function() {
                    return _allCorrect;
                },
                getUpdateValues: function() {
                    return _gameValues;
                },
                watchSelectedItems: function() {
                    var self = this;
                    $rootScope.$watchCollection(this.selectedItems, function(newValue, oldValue, scope) {
                        if (newValue && newValue !== oldValue) {
                            self.update();
                        }
                    });
                },
                /**
                 * Updates the game values `_gameValues`
                 * To be called each time the collection of dropped items is changed
                 */
                update: function() {

                    // in the `selectedSquares` array each element represents a square on the board,
                    // and is populated with the numerical value of drag item if present
                    var selectedSquares = [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // `complete` is true if all the `drop` items contain a `drag` item
                        complete = false,
                    // 'total` is the sum of the values in each `drop` item
                        total = _.reduce(_selectedItems, function(sum, item) {
                            return sum + (item && item.hasOwnProperty('title') ? Number(item.title) : 0);
                        }, 0),

                    // `selected` is the total number of `drop` items which have been populated with a `drag` item
                        selected = _.reduce(_selectedItems, function(sum, item) {
                            return sum + (item && item.hasOwnProperty('title') ? 1 : 0);
                        }, 0);

                    // add the numerical value to the corresponding index in the `selectedSquares` array from the current `selectedItems`
                    _.forEach(this.selectedItems(), function(item, key) {
                        selectedSquares[key] = (item && item.hasOwnProperty('title') ? Number(item.title) : 0);
                    });

                    if (total === _grandTotal) {
                        complete = true;
                    }

                    // evaluate each row, column and diagonal in turn
                    var row1 = selectedSquares[0] + selectedSquares[1] + selectedSquares[2],
                        row2 = selectedSquares[3] + selectedSquares[4] + selectedSquares[5],
                        row3 = selectedSquares[6] + selectedSquares[7] + selectedSquares[8],

                        column1 = selectedSquares[0] + selectedSquares[3] + selectedSquares[6],
                        column2 = selectedSquares[1] + selectedSquares[4] + selectedSquares[7],
                        column3 = selectedSquares[2] + selectedSquares[5] + selectedSquares[8],

                        diagonal1 = selectedSquares[0] + selectedSquares[4] + selectedSquares[8],
                        diagonal2 = selectedSquares[2] + selectedSquares[4] + selectedSquares[6],

                        row1Correct = (row1 === this.magicNumber()),
                        row2Correct = (row2 === this.magicNumber()),
                        row3Correct = (row3 === this.magicNumber()),

                        column1Correct = (column1 === this.magicNumber()),
                        column2Correct = (column2 === this.magicNumber()),
                        column3Correct = (column3 === this.magicNumber()),

                        diagonal1Correct = (diagonal1 === this.magicNumber()),
                        diagonal2Correct = (diagonal2 === this.magicNumber()),

                        rowsCorrect = row1Correct && row2Correct && row3Correct,
                        columnsCorrect = column1Correct && column2Correct && column3Correct,
                        diagonalsCorrect = diagonal1Correct && diagonal2Correct,

                        _allCorrect = rowsCorrect && columnsCorrect && diagonalsCorrect;

                    _gameValues = {correct: _allCorrect, squares: selectedSquares, selected: selected, complete: complete};
                }
            };
        // trigger the watch internally
        game.watchSelectedItems();

        return game;
    }]);
}());






