'use strict';

//controller for single project view
angular.module('app').controller('DragDrop', ['$scope', '$compile', function($scope, $compile) {
    console.log('-GULP-TEST- 17:14 hi from Drag Drop!');

    var self = this;
    this.test = 'From Drag Drop!';

    this.dropTargets = [
        {thumb: '1.png'},
        {thumb: '2.png'},
        {thumb: '3.png'},
        {thumb: '4.png'}
    ];

    this.list1 = [];


    this.list2 = [
        {title: 'K', drag: true},
        {title: 'E', drag: true},
        {title: 'B', drag: true},
        {title: 'A', drag: true}
    ];

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
