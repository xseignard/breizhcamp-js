angular.module('bzh.geektic.details', []).
  /**
   * Details directive 
   * @class appFocus
   * @module Geektic
   */
  directive('bzhDetails', ['$rootScope','$compile','$animator',function($rootScope, $compile, $animator) {
    var former, formerContainer, formerID, formerIndex = -1;
    $rootScope.$on('results', function() {
      if(former) {
        formerContainer.remove();
        formerID = formerContainer = former = formerIndex = null;
      }
    });
    return function($scope, element, attrs) {
      element.bind('click', function() {
        if(formerID == element.attr('id')) return;
        var animator = $animator($scope, {
          ngAnimate: attrs.appFocus
        });

        var cursor = element, parent = cursor.parent();
        while(cursor && cursor.position().left > 100) {
          cursor = cursor.prev();
        }

        var row = [], pos;
        do {
          row.push(cursor);
          cursor = cursor.next();
          pos = cursor ? cursor.position().left : 0;
        }
        while(pos > 100);

        var rowIndex = getRowIndex(element, row.length);

        if(former) {
          if(rowIndex != formerIndex) {
            animator.hide(formerContainer);
            formerContainer = former = null;
          }
          else {
            animator.leave(former);
          }
        }
        formerIndex = rowIndex;
        formerID = element.attr('id');

        var isNew = !formerContainer;
        if(!formerContainer) {
          formerContainer = angular.element('<div class="focus"></div>');
          row[0].before(formerContainer);
          formerContainer.hide();
        }

        former = angular.element('<div ng-include="\'focus\'" class="focus-slide"></div>');
        $compile(former)($scope);
        $scope.$apply();

        animator.enter(former, formerContainer);
        if(isNew) {
          animator.show(formerContainer);
        }
      });

      function getRowIndex(element, perRow) {
        var index = 0;
        var parent = element.parent('.results');
        var children = parent.children('.result');
        var elementID = element.attr('id');
        for(var i=0;i<children.length;i++) {
          var id = children[i].id;
          if(i && i % perRow === 0) {
            index++;
          }
          if(id == elementID) {
            break;
          }
        }
        return index;
      }
    };
  }]);