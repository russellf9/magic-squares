'use strict';

//controller for single project view
angular.module('app').controller('DragDrop', ['$scope', '$compile', function($scope, $compile) {
    console.log('-GULP-TEST- 17:14 hi from Drag Drop!');

    var self = this;
    this.test = 'From Drag Drop!';

    var numberOfSquares = 9;

    this.dropTargets = [];

    this.list2 = [];

    for(var i = 0; i<numberOfSquares; i++) {
        this.dropTargets.push({value:i});
        this.list2.push({title: i+1, drag: true})
    }

    this.list1 = [];

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
        console.log('hey, you dumped me :-(', self.draggedTitle);
    };

    this.overCallback = function(event, ui) {
        console.log('Look, I`m over you');
    };

    this.outCallback = function(event, ui) {
        console.log('I`m not, hehe');
    };
}]);
