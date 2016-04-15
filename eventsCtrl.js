angular.module('task1')
    .controller('eventsCtrl', [
        '$scope', function ($scope) {
            $scope.currentColor = '';
            $scope.$on('currentColorChanged', function (event, colorValue) {

                $scope.currentColor = colorValue;
                $scope.$apply();
            });
        }
    ]).directive('myCanvas', ['$document', '$timeout', function ($document, $timeout) {
    return {
        link: function ($rootScope, element, attrs) {
            //draw the 2 images on the canvas so we can track the mouse positions
            var context = element[0].getContext("2d");
            var red_image = new Image();
            red_image.src = 'red.png';
            red_image.onload = function () {
                context.drawImage(red_image, 0, 0);
            }

            var green_image = new Image();
            green_image.src = 'green.png';
            green_image.onload = function () {
                context.drawImage(green_image, 0, 0);
            }

            //track mouse movements on the canvas
            element[0].addEventListener('mousemove', function (evt) {
                // Prevent default event handling on selected content
                event.preventDefault();
                var rect = element[0].getBoundingClientRect();

                //calculate the mouse position relative to the canvas
                var mousePos = {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };

                //the image dimensions are 150x140px, on a 640x480px canvas with 40px left margin and 35px top margin for green, and
                //310px top margin for red
                var isWithinRedImgBoundaries = ((mousePos.y < 450 && mousePos.y > 310) && (mousePos.x > 40 && mousePos.x < 190));

                if (isWithinRedImgBoundaries) {
                    $rootScope.$broadcast('currentColorChanged', 'red');
                }

                var isWithinGreenImgBoundaries = ((mousePos.y < 175 && mousePos.y > 35) && (mousePos.x > 40 && mousePos.x < 190));

                if (isWithinGreenImgBoundaries) {
                    $rootScope.$broadcast('currentColorChanged', 'green');
                }

                if(!isWithinGreenImgBoundaries && !isWithinRedImgBoundaries)
                {
                    $rootScope.$broadcast('currentColorChanged', '');
                }
            });
        }
    };
}]);

