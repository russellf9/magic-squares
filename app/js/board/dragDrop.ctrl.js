'use strict';

//controller for single project view
angular.module('app').controller('DragDrop', ['$scope', '_', 'Evaluate', function($scope, _, Evaluate) {
    console.log('-GULP-TEST- 20:17 hi from Drag Drop!');

    var self = this;
    this.test = 'From Drag Drop!';

    this.numberOfSquares = Evaluate.numberOfSquares();

    this.dropTargets = [];

    this.list2 = [];

    this.selectedItems = Evaluate.selectedItems();

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
     */
    this.update = function() {

        this.correct = Evaluate.update();

    };
}]);
