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
            console.log('10:34 draggable: ', element);
            angular.element(element).attr('draggable', 'true');


            var el = angular.element(element);

            if (!scope.id) {
                scope.id = el.text();
            }
            angular.element(element).attr('id', scope.id);

            element.bind('dragstart', function(event) {

                console.log('e: ', event);

                event.stopPropagation();

                scope.dragStart();

                event.originalEvent.dataTransfer.effectAllowed = 'move';

                event.originalEvent.dataTransfer.setData('text', scope.id); // just test for now...

            });

            element.bind('dragend', function(e) {
                $rootScope.$emit('DRAG.END');
            });
        }
    }
}]);
