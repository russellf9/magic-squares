'use strict';

/**
 * A service to evaluate the games business logic
 */


angular.module('app').service('Evaluate', ['_', '$q', function(_, $q) {

    var _numberOfSquares = 9,
        _grandTotal = 45,
        _selectedItems = [],
        _allCorrect = false,
        _correct = {};


    return {
        numberOfSquares: function() {
            return _numberOfSquares;
        },
        grandTotal: function() {
            return _grandTotal;
        },
        magicNumber: function() {
            return _grandTotal / 3;
        },
        selectedItems: function() {
            return _selectedItems;
        },
        allCorrect: function() {
            return _allCorrect;
        },
        getCorrect: function() {
            return _correct;
        },
        update: function() {
            _allCorrect = false;
            var selectedSquares = [0, 0, 0, 0, 0, 0, 0, 0, 0],
                total = _.reduce(_selectedItems, function(sum, item) {
                    // console.log('item: ', item);

                    return sum + (item && item.hasOwnProperty('title') ? Number(item.title) : 0); //Number(item.title);
                }, 0);

            console.log('total: ', total);

//        console.log('Update | total: ', total);
            _.forEach(_selectedItems, function(item, key) {
                console.log(key, ' | item: ', item);

                selectedSquares[key] = (item && item.hasOwnProperty('title') ? Number(item.title) : 0);
            });

            console.log('selectedSquares: ', selectedSquares);
            if (total === _grandTotal) {
                console.log('COMPLETED!');
            }

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

            console.log('COMPLETED! correct??? ', _allCorrect);

            _correct = {correct:_allCorrect, squares:selectedSquares};


            return _allCorrect;
        }

    }
}]);


