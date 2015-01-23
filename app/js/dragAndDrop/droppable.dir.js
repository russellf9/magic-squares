angular.module('app').directive('droppable', [function() {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        controller: function($scope) {
            //$scope.onDrop = function(obj) {
            //    console.log('droppable - onDrop! | obj: ',obj);
            //}
        },
        link: function(scope, element, attrs) {
            scope.id = angular.element(element).attr('id');
            if (!scope.id) {
                // use uuid service
                scope.id = String('drop-' + Math.floor((Math.random() * 6) + 1));//uuid.new();
                angular.element(element).attr('id', scope.id);
            }

            /**
             * dragover
             */
            scope.bindDragover = function() {
                element.bind('dragover', function(event) {
                    console.log('droppable::dragover');
                    if (event.preventDefault) {
                        event.preventDefault(); // Necessary. Allows us to drop.
                    }
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                });
            };

            /**
             * dragenter
             */
            element.bind('dragenter', function(event) {
                // Add the CSS class to the drop zone // That way we can indicate the drop location to the user - See more at: http://www.devx.com/webdev/html-5-drag-and-drop-tutorial.html#sthash.xUqRA91k.dpuf
                console.log('droppable::dragenter | e: ', event);
                angular.element(event.target).addClass('lvl-over');
            });

            /**
             * dragleave
             * element.target is previous target element.
             */
            element.bind('dragleave', function(element) {
                console.log('droppable::dragleave');
                angular.element(element.target).removeClass('lvl-over');  // this / e.target is previous target element.
            });


            /**
             * drop
             */
            element.bind('drop', function(event) {
                console.log('droppable::drop');
                if (event.preventDefault) {
                    event.preventDefault(); // Necessary. Allows us to drop.
                }
                if (event.stopPropogation) {
                    event.stopPropogation(); // Necessary. Allows us to drop.
                }
                console.log('data transfer: ', event.dataTransfer)
                var data = event.dataTransfer.getData('text'),
                    dest = document.getElementById(scope.id),
                    src = document.getElementById(data);
                console.log('drop | dest: ', dest, ' | src: ', src)
                if (!src) {
                    return;
                }
                scope.onDrop()(scope.id, src.id);
            });
        }
    }
}]);




