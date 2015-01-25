'use strict';

//controller for single project view
angular.module('app').controller('DragDrop', ['$scope', '$timeout', '_', 'Evaluate', function($scope, $timeout, _, Evaluate) {

    var self = this;

    this.numberOfSquares = Evaluate.numberOfSquares();

    this.dropTargets = [];

    this.list2 = [];

    this.selectedItems = [];

    Evaluate.setSelectedItems(this.selectedItems);

    for (var i = 0; i < this.numberOfSquares; i++) {
        this.dropTargets.push({value: i});
        this.list2.push({title: String(i + 1), drag: true});
    }

    this.startCallback = function(event, ui, title) {
        console.log('DragDrop::startCallback  You started dragging: ' + title.title);
        self.draggedTitle = title.title;
    };

    this.stopCallback = function(event, ui) {
        console.log('DragDrop::stopCallback - Why did you stop dragging me?');
    };

    this.dragCallback = function(event, ui) {
        console.log('DragDrop::dragCallback - hey, look I`m flying');
    };

    /**
     * Evoked when a `drag` item has been dropped into the `drop` item
     * @param event
     * @param ui
     * @param index
     */
    this.dropCallback = function(event, ui, index, dragIndex) {
        var currentDragItem = Evaluate.selectedItems()[index];
        console.log('DragDrop::dropCallback  - hey, you dumped me :-(', currentDragItem.title);
    };

    /**
     * Evoked when a `drag` item is over `drop` item
     * Note: can be evoked when the user is dragging another drag item over this drag item!
     * @param event
     * @param ui
     * @param dropTarget
     * @param dragIndex
     */
    this.overCallback = function(event, ui, dropTarget, dragIndex) {
        console.log('DragDrop::overCallback - Look, the drag?: ', dragIndex);
    };

    /**
     * Evoked when a `drag` item has been removed from a `drop` item
     * @param event
     * @param ui
     */
    this.outCallback = function(event, ui, index, dragIndex, drop) {
        console.log('DragDrop::outCallback - A I`m not, hehe good bye to: ', self.draggedTitle, ' ?'); // not always right!
        var currentDragItem = Evaluate.selectedItems()[index];
        console.log('DragDrop::outCallback  - hey, good bye to: ', currentDragItem.title);
    };
}]);
