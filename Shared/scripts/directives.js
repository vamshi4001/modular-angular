'use strict';

angular.module('providerApp', ['ngCookies'])

    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive("customSort", function() {
        return {
            restrict: 'A',
            transclude: true,    
            scope: {
              order: '=',
              sort: '='
            },
            template : 
              ' <a ng-click="sort_by(order)" style="color: #555555;">'+
              '    <span ng-transclude></span>'+
              '    <i ng-class="selectedCls(order)"></i>'+
              '</a>',
            link: function(scope) {
                        
                // change sorting order
                scope.sort_by = function(newSortingOrder) {       
                    var sort = scope.sort;
                    
                    if (sort.sortingOrder == newSortingOrder){
                        sort.reverse = !sort.reverse;
                    }                    

                    sort.sortingOrder = newSortingOrder;        
                };
                
               
                scope.selectedCls = function(column) {
                    if(column == scope.sort.sortingOrder){
                        return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
                    }
                    else{            
                        return'icon-sort' 
                    } 
                };      
              }// end link
        }
    });