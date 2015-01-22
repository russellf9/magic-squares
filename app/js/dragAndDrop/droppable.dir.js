angular.module('app').directive('droppable', [function() {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        controller : function($scope) {
            //$scope.onDrop = function(obj) {
            //    console.log('droppable - onDrop! | obj: ',obj);
            //}
        },
        link: function(scope, element, attrs) {
            scope.id = angular.element(element).attr('id');
            if (!scope.id) {
                // use uuid service
                scope.id = String(Math.floor((Math.random() * 6) + 1));//uuid.new();
                angular.element(element).attr('id', scope.id);
            }

            /**
             * dragover
             */
            element.bind('dragover', function(event) {
                if (event.preventDefault) {
                    event.preventDefault(); // Necessary. Allows us to drop.
                }

                if (event.stopPropagation) {
                    event.stopPropagation();
                }

                event.dataTransfer.dropEffect = 'move';
                return false;
            });

            /**
             * dragenter
             */
            element.bind('dragenter', function(event) {

                // Add the CSS class to the drop zone // That way we can indicate the drop location to the user - See more at: http://www.devx.com/webdev/html-5-drag-and-drop-tutorial.html#sthash.xUqRA91k.dpuf

                console.log('e: ', event);

                angular.element(event.target).addClass('lvl-over');
            });

            /**
             * dragleave
             * element.target is previous target element.
             */
            element.bind('dragleave', function(element) {
                angular.element(element.target).removeClass('lvl-over');  // this / e.target is previous target element.
            });


            element.bind('drop', function(event) {
                if (event.preventDefault) {
                    event.preventDefault(); // Necessary. Allows us to drop.
                }

                if (event.stopPropogation) {
                    event.stopPropogation(); // Necessary. Allows us to drop.
                }

                var data = event.dataTransfer.getData('text'),
                    dest = document.getElementById(scope.id),
                    src = document.getElementById(data);

                console.log('drop | dest: ', dest, ' | src: ',src)

                // dropId, dragId

                scope.onDrop()(scope.id, src.id);
            });
        }
    }
}]);




