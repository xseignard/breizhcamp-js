/**
 * breizhcamp-js_frontend - v0.0.1 - 2013-06-11
 * https://github.com/xseignard/breizhcamp-js
 *
 * Copyright (c) 2013 
 * Licensed MIT
 */
angular.module('bzh.geektic.animations', [])

  .animation('list-out', ['$window',function($window) {
    return {
      start : function(element, done) {
        var duration = 1;
        TweenMax.set(element, {position:'relative'});
        TweenMax.to(element, duration, {opacity:0, width:0});
        $window.setTimeout(done, duration * 1000);
      }
    };
  }])

  .animation('list-in', ['$window',function($window) {
    return {
      setup: function(element) {
        TweenMax.set(element, {opacity:0, width:0});
      },
      start : function(element, done) {
        var duration = 1;
        TweenMax.to(element, duration, {opacity:1, width:210});
        $window.setTimeout(done, duration * 1000);
      }
    };
  }])

  .animation('list-move', ['$window',function($window) {
    return {
      start : function(element, done) {
        var duration = 1;
        TweenMax.to(element, duration, {opacity:1, width:210});
        $window.setTimeout(done, duration * 1000);
      }
    };
  }])

  .animation('details-leave', function() {
    return {
      setup : function(element, done) {
        var items = element.find('.ani');
        TweenMax.set(items, {position:'relative'});
        return items;
      },
      start : function(element, done, items) {
        TweenMax.staggerTo(items, 1, {left:-500, opacity:0}, 0.1, done);
      }
    };
  })

  .animation('details-enter', ['$window', function($window) {
    return {
      setup : function(element, done) {
        var items = element.find('.ani');
        TweenMax.set(items, {position:'relative', left:500, opacity:0});
        return items;
      },
      start : function(element, done, items) {
        var parent = element.parent('.details');
        var timeout = parent.children().length > 1 ? 300 : 1;
        $window.setTimeout(function() {
          TweenMax.staggerTo(items, 1, {left:0, opacity:1}, 0.1, done);
        }, timeout);
      }
    };
  }])

  .animation('details-show', function() {
    return {
      start : function(element, done, items) {
        TweenMax.set(element, {height:0,display:'block'});
        TweenMax.to(element, 0.5, {height:250, onComplete:done});
      }
    };
  })

  .animation('details-hide', function() {
    return {
      start : function(element, done, items) {
        TweenMax.to(element, 0.5, {
          height:0,
          onComplete:function() {
            done();
            element.remove();
          }
        });
      }
    };
  });

angular.module('bzh.geektic.appCtrl', ['ngResource']).
  /**
   * App controller
   * @class AppCtrl
   * @module bzh.geektic.index
   */
  controller('AppCtrl', ['$scope', '$rootScope', '$resource', function($scope, $rootScope, $resource) {

    /**
     * Resource that handle the REST call to the server to fetch geeks
     */
    var Geek = $resource('/geek/likes/:like');

    /**
     * Loaded geeks from the server
     * @property $scope.geeks
     * @type {Array}
     */
    $scope.geeks = Geek.query();

    /**
     * Load 6 more geeks
     * @method $scope.more
     */
    $scope.more = function() {
      var opts = {limit : 6, skip : $scope.geeks.length};
      if ($scope.q && $scope.q.length > 0) {
        opts.like = $scope.q;
      }
      Geek.query(opts, function(newGeeks) {
        // push each new Geek to the scope
        angular.forEach(newGeeks, function(newGeek, key){
          if (newGeek instanceof Geek) $scope.geeks.push(newGeek);
        });
        // tell the rootscope to broadcast that new results are available
        $rootScope.$broadcast('results');
        // scroll down the page
        $scope.scroll();
      });
    };

    /**
     * Scroll down the page
     */
    $scope.scroll = function() {
        TweenMax.to(window, 0.5, {delay:0.9, scrollTo:"max", ease:Power2.easeOut});
    };

    /**
     * Fetch the corresponding gravatar image from the given email
     * @method $scope.gravatar
     * @param {String} email
     * @param {Number} size - the size of the image to return
     */
    $scope.gravatar = function(email, size) {
      return 'http://www.gravatar.com/avatar/' + md5(email) + '?d=mm&s=' + size;
    };

  }]);
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
      var children = element.parent().children('.result'),
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
        if(formerID === element.attr('id')) return;
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
          if(rowContent.index !== formerIndex) {
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
angular.module('bzh.geektic', ['bzh.geektic.appCtrl', 'bzh.geektic.details', 'bzh.geektic.animations', 'bzh.geektic.templates'])
  /**
   * Route configuration
   * @class Index
   * @module bzh.geektic
   */
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      // render the list.tpl.html template when on the / page
      .when('/', {
        templateUrl: 'app/index/partials/list.tpl.html'
      })
      // redirect to / for any other route
      .otherwise({
        redirectTo : '/'
      });
  }]);

angular.module('bzh.geektic.templates', ['app/index/partials/list.tpl.html']);

angular.module("app/index/partials/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/index/partials/list.tpl.html",
    "<script type=\"text/ng-template\" id=\"details\">\n" +
    "  <div class=\"details-inner\">\n" +
    "    <div class=\"inner\">\n" +
    "      <h4 class=\"ani\">{{result.lastname}} {{result.firstname}}</h4>\n" +
    "      <div class=\"ani line\">\n" +
    "        <img ng-src=\"{{gravatar(result.email, 140)}}\" />\n" +
    "      </div>\n" +
    "      <div class=\"ani line\">\n" +
    "        <p ng-hide=\"!result.city\" class=\"ani line\">Living in {{result.city}}</p>\n" +
    "        <p><i class=\"icon-thumbs-up\" /> : \n" +
    "          <span ng-repeat=\"like in result.likes\">\n" +
    "            {{like}}\n" +
    "            <span ng-if=\"!$last\">, </span>\n" +
    "          </span>\n" +
    "        </p>\n" +
    "        <p><i class=\"icon-thumbs-down\" /> : \n" +
    "          <span ng-repeat=\"hate in result.hates\">\n" +
    "            {{hate}}\n" +
    "            <span ng-if=\"!$last\">, </span>\n" +
    "          </span>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"results\">\n" +
    "  <a href=\"\" \n" +
    "     bzh-details=\"{enter:'details-enter',leave:'details-leave',show:'details-show',hide:'details-hide'}\"\n" +
    "     id=\"id-{{result.lastname}}{{result.firstname}}\" \n" +
    "     ng-repeat=\"result in geeks | filter: {likes :q}\" \n" +
    "     class=\"result\" \n" +
    "     ng-animate=\"{leave:'list-out', enter:'list-in', move:'list-move'}\">\n" +
    "    <div class=\"inner\">\n" +
    "      <h5>{{result.lastname}} {{result.firstname}}</h5>\n" +
    "      <img ng-src=\"{{gravatar(result.email, 140)}}\" />\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <div class=\"load-more-results\">\n" +
    "    <div  class=\"medium btn info\">\n" +
    "      <a href=\"\" ng-click=\"more()\">\n" +
    "        <i class=\"icon-search\"></i>\n" +
    "        Load More Results\n" +
    "      </a>\n" +
    "    <div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
