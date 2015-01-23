angular.module('app').directive('draggable', ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        scope: {
            // onDrag: '&'
        },
        controller: function($scope, $rootScope) {
            $scope.dragStart = function() {
                console.log('dragStart');

                //$scope.onDrag();

                $scope.$emit('DRAG.START', {name: 'russell'});
            }
        },
        link: function(scope, element, attrs) {
            console.log('set the draggable attribute - draggable: ', element.attr('draggable'));

            //angular.element(element).attr('draggable', 'true');
            // remove the draggable attribute if set to force
            if (!element.attr('draggable') || element.attr('draggable') === 'false') {
                angular.element(element).removeAttr('draggable');
            }


            var el = angular.element(element);

            if (!scope.id) {
                scope.id = 'drag-' + el.text();
            }
            angular.element(element).attr('id', scope.id);

            scope.bindDragStart = function() {
                element.bind('dragstart', function(event) {
                    console.log('drag start - e: ', event);
                    event.stopPropagation();
                    scope.dragStart();
                    event.originalEvent.dataTransfer.effectAllowed = 'move';
                    event.originalEvent.dataTransfer.setData('text', scope.id); // just test for now...
                });
            };

            scope.bindDragEnd = function() {
                element.bind('dragend', function(e) {
                    $rootScope.$emit('DRAG.END');
                });
            };
            // set to draggable item
            scope.bindDragStart();
            scope.bindDragEnd();
        }
    }
}]);
