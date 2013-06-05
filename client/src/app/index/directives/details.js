angular.module('bzh.geektic.details', []).
  /**
   * Details directive 
   * @class bzhDetails
   * @module bzh.geektic.details
   */
  directive('bzhDetails', ['$rootScope','$compile','$animator',function($rootScope, $compile, $animator) {
    
    var former, detailsContainer, formerID, formerIndex = -1;
    
    /**
     * When the event results is intercepted, remove the previous details page
     */
    $rootScope.$on('results', function() {
      if(former) {
        detailsContainer.remove();
        formerID = detailsContainer = former = formerIndex = null;
      }
    });

    /**
     * Internal function to return the row index of the clicked element
     * @param {Object} element - the jquery-ish element that has been clicked
     * @return an object containing the row index and the array of the items of this row
     */
    var findRowIndex = function(element) {
      var parent = element.parent('.results'),
          children = element.parent().children('.result'),
          index = 0,
          elementId = element.attr('id');

      // get the number of '.result' elements in the row of the clicked element
      // by checking if they have the same top value
      var items = children.filter(function(index) {
        return $(this).position().top === element.position().top;
      });
      // then iterate over children and increment the index when
      // a line
      for(var i=0;i<children.length;i++) {
        var id = children[i].id;
        // a row is traversed
        if(i % items.length === 0) {
          index++;
        }
        // no need to traverse the dom further
        if(id === elementId) {
          break;
        }
      }
      return {index: index, items: items};
    };
    
    /**
     * PostLink function that binds a click on the element with the current directive.
     * This click will display the details view
     * @param {Object} $scope - the scope used by the directive
     * @param {Object} element - the element on which to apply the directive
     * @param {Object} attrs - instance attributes of the element
     * @see http://code.angularjs.org/1.1.5/docs/guide/directive
     */
    return function($scope, element, attrs) {
      // add a click handler on each element that have the directive
      element.bind('click', function() {
        // do nothing if you clicked on the same detail link that is already opened
        if(formerID == element.attr('id')) return;
        // get the animation params from the bzhDetails directive
        // and set up an animator with them
        // see http://code.angularjs.org/1.1.5/docs/api/ng.$animator
        var animator = $animator($scope, {
          ngAnimate: attrs.bzhDetails
        });

        // get the row index and items
        var rowContent = findRowIndex(element);
        // hide a previously opened detail view
        if(detailsContainer) {
          // when not on the same line, hide the detail view
          // trigger the hide animation event
          if(rowContent.index != formerIndex) {
            animator.hide(detailsContainer);
            detailsContainer = former = null;
          }
          // when on the same line of the detail view to be opened
          // only trigger the leave animation event
          else {
            animator.leave(former);
          }
        }
        // keep track of the previously clicked element
        formerIndex = rowContent.index;
        formerID = element.attr('id');

        // insert, if needed, the div that will contain the template at the right place
        // i.e. above the clicked element
        var isNew = !detailsContainer;
        if(isNew) {
          detailsContainer = angular.element('<div class="details"></div>');
          angular.element(rowContent.items[0]).before(detailsContainer);
          detailsContainer.hide();
        }

        // create, compile and apply the scope to the template
        former = angular.element('<div ng-include="\'details\'" class="details-slide"></div>');
        $compile(former)($scope);
        $scope.$apply();

        // trigger the enter animation event
        animator.enter(former, detailsContainer);
        if(isNew) {
          animator.show(detailsContainer);
        }
      });
    };
  }]);