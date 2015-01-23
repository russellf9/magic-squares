'use strict';

//controller for single project view
angular.module('app').controller('DragDrop', ['$scope', '$compile', '_', function($scope, $compile, _) {
    console.log('-GULP-TEST- 17:14 hi from Drag Drop!');

    var self = this;
    this.test = 'From Drag Drop!';

    this.numberOfSquares = 9;
    // magic number - :-(
    this.grandTotal = 45;
    this.magicNumber = 45 / 3;

    this.dropTargets = [];

    this.list2 = [];

    this.selectedItems = [];

    for (var i = 0; i < this.numberOfSquares; i++) {
        this.dropTargets.push({value: i});
        this.list2.push({title: String(i + 1), drag: true});
    }

    this.startCallback = function(event, ui, title) {
        console.log('You started dragging: ' + title.title);
        self.draggedTitle = title.title;
    };

    this.stopCallback = function(event, ui) {
        console.log('Why did you stop dragging me?');
    };

    this.dragCallback = function(event, ui) {
        console.log('hey, look I`m flying');
    };

    this.dropCallback = function(event, ui) {
        console.log('\n -------- \nhey, you dumped me :-(', self.draggedTitle);
        self.update();
    };

    this.overCallback = function(event, ui) {
        console.log('Look, I`m over you');
    };

    this.outCallback = function(event, ui) {
        console.log('I`m not, hehe');
        self.update();
    };

    /**
     * Evaluates the `selected items`
     *
     * // TODO move logic to a service!
     */
    this.update = function() {

        var selectedSquares = [0,0,0,0,0,0,0,0,0];

        console.log('this.numberOfSquares: ', this.numberOfSquares);

        console.log('selectedItems - ', self.selectedItems);
        console.log('selectedItems len - ', self.selectedItems.length);
        console.log('selectedItems len - ', _.size(self.selectedItems)); // the len will be as high as the last index value

        var total = _.reduce(self.selectedItems, function(sum, item) {
           // console.log('item: ', item);

            return sum + (item && item.hasOwnProperty('title') ? Number(item.title) : 0); //Number(item.title);
        }, 0);

        console.log('total: ', total);

//        console.log('Update | total: ', total);
        _.forEach(self.selectedItems, function(item, key) {
            console.log(key, ' | item: ', item);

            selectedSquares[key] = (item && item.hasOwnProperty('title') ? Number(item.title) : 0);
        });

        console.log('selectedSquares: ', selectedSquares);
        if (total === this.grandTotal) {
            console.log('COMPLETED!');

            var row1 = selectedSquares[0] + selectedSquares[1] + selectedSquares[2],
                row2 = selectedSquares[3] + selectedSquares[4] + selectedSquares[5],
                row3 = selectedSquares[6] + selectedSquares[7] + selectedSquares[8],

                column1 = selectedSquares[0] + selectedSquares[3] + selectedSquares[6],
                column2 = selectedSquares[1] + selectedSquares[4] + selectedSquares[7],
                column3 = selectedSquares[2] + selectedSquares[5] + selectedSquares[8],

                diagonal1 = selectedSquares[0] + selectedSquares[4] + selectedSquares[8],
                diagonal2 = selectedSquares[2] + selectedSquares[4] + selectedSquares[6],

                row1Correct = (row1 === this.magicNumber),
                row2Correct = (row2 === this.magicNumber),
                row3Correct = (row3 === this.magicNumber),

                column1Correct = (column1 === this.magicNumber),
                column2Correct = (column2 === this.magicNumber),
                column3Correct = (column3 === this.magicNumber),


                diagonal1Correct = (diagonal1 === this.magicNumber),
                diagonal2Correct = (diagonal2 === this.magicNumber),

                rowsCorrect = row1Correct && row2Correct && row3Correct,
                columnsCorrect = column1Correct && column2Correct && column3Correct,
                diagonalsCorrect = diagonal1Correct && diagonal2Correct,


                allCorrect = rowsCorrect && columnsCorrect && diagonalsCorrect;

            console.log('COMPLETED! correct??? ', allCorrect);



        }



    };
}]);
