(function() {

    'use strict';

    //controller for drag and drop
    angular.module('app').controller('DragDrop', ['Game', function(Game) {

        var self = this;

        this.dropTargets = Game.getDropItems();

        // the drag items
        this.dragItems = Game.getDragItems();

        this.selectedItems = Game.selectedItems();

        Game.init();

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
        this.dropCallback = function(event, ui, index) {
            var currentDragItem = Game.selectedItems()[index];
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
        this.outCallback = function(event, ui, index) {
            var currentDragItem = Game.selectedItems()[index];
            if (currentDragItem && currentDragItem.hasOwnProperty('title')) {
                console.log('DragDrop::outCallback  - hey, good bye to: ', currentDragItem.title);
            }
        };
        /**
         *
         * @param value
         */
        this.getRowTotal = function(value) {
            return Game.getRowTotal(value);
        };
        /**
         *
         * @param value
         */
        this.getColumnTotal = function(value) {
            return Game.getColumnTotal(value);
        };
        /**
         *
         * @param value
         * @returns {*}
         */
        this.getDiagonalTotal = function(value) {
            return Game.getDiagonalTotal(value);
        };
        /**
         *
         * @param value
         * @returns {number}
         */
        this.getDiagonalTotalReverse = function(value) {
            var reverse = (value === 0) ? 1: 0;
            return Game.getDiagonalTotal(reverse);
        };
    }]);
}());


