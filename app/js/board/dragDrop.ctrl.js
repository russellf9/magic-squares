'use strict';

//controller for single project view
angular.module('app').controller('DragDrop', ['$scope', function($scope) {
    console.log('-GULP-TEST- 17:14 hi from Drag Drop!');
    this.test = 'From Drag Drop!';

    this.onDragOver = function(event) {
        console.log('onDragOver');
    };


    this.dragged = function(id, data) { // function referenced by the drop target
        console.log('dragged! - ', arguments);
    };

    /**
     * Handler for the Event fired when a `drag` item has been dropped on a `drop` item
     * @param dropId
     * @param dragId
     */
    this.dropped = function(dropId, dragId) { // function referenced by the drop target

        console.log('dropped! - ', dropId, dragId);

        /**
         * //the directive provides a native dom object, wrap with jqlite
         var drop = angular.element(dropEl);
         var drag = angular.element(dragEl);
         */
    };

    $scope.$on('DRAG.START', function(event, obj) {
        console.log('DRAG.START: ', obj);
    });

    //this.$on('DRAG.START', function(event, obj) {
    //    console.log('DRAG.START: ', obj);
    //});

    this.onDragComplete = function($data, $event) {
        console.log('onDragComplete');
    };
}]);
