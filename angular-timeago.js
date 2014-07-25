/**
 * Angular timeago
 * calculate the time ago from a start time in milliseconds
 *
 *
 */
angular.module('angular-timeago', []).
    directive('ilnTimeago', [
        '$timeout',
        function ( $timeout ) {
        return {
            restrict: 'E',
            template: '{{ ilnTimeAgo }}',
            link:   function ( scope, elm, attrs ) {

                scope.$watch( attrs.time, function ( attrValue ) {

                    var timeIsSeconds = false;
                    var initialTime = attrValue;

                    scope.ilnTimeAgo = '';

                    function timeAgo( _initTime ){

                        var differenceInSeconds = (
                                Math.round( ( new Date() ).getTime() / 1000)
                            ) - ( _initTime / 1000 );

                        if( differenceInSeconds < 60 ) {
                            // calculate the time again in a second
                            $timeout(function(){
                                init();
                            }, 1000 );
                            return Math.floor( differenceInSeconds ) + 's';
                        } else if (differenceInSeconds < 60*60) {
                            var _minutes = Math.floor(differenceInSeconds/60);
                            return _minutes + 'm';

                        } else if (differenceInSeconds < 60*60*24) {

                            var hours = Math.floor(differenceInSeconds/60/60);
                            return hours + 'h';

                        } else if (differenceInSeconds > 60*60*24){
                            var days = Math.floor(differenceInSeconds/60/60/24);
                            return days + 'ds';
                        }

                        return differenceInSeconds;
                    }

                    var init = function(){
                        scope.ilnTimeAgo = timeAgo( initialTime );
                    };

                    init();
                });

            }
        };
    }]);
