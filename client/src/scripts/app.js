angular.module('Geektic', ['AppAnimations'])
  // route configuration
  .config(['$routeProvider', function($routeProvider) {
    var shared = {
      controller: 'ListCtrl',
      templateUrl: './templates/list.html'
    };
    $routeProvider
      .when('/', shared)
      .otherwise({
        redirectTo : '/'
      });
  }])
  
  /**
   * App controller 
   * @class AppCtrl
   * @module Geektic
   */
  .controller('AppCtrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    /**
     * Loaded geeks from the server
     * @property $scope.geeks
     * @type {Array}
     */
    // TODO : load it from the server
    $scope.geeks = geeks;
    /**
     * Number of loaded geeks
     * @property $scope.totalGeeks
     * @type {Number}
     */
    $scope.totalGeeks = $scope.geeks.length;
    /**
     * Number of geeks to display, defaults to 12
     * @property $scope.limit
     * @property $scope.defaultLimit
     * @type {Array}
     */
    $scope.limit = $scope.defaultLimit = 12;

    /**
     * Load 6 more geeks
     * @method $scope.more
     */
    $scope.more = function() {
      $scope.limit += 6;
      // tell the rootscope to broadcast that new results are available
      $rootScope.$broadcast('results');
      // tell the rootscope to broadcast that more button has been clicked
      $rootScope.$broadcast('more');
    };

    /**
     * Fetch the corresponding gravatar image from the given email
     * @method $scope.gravatar
     * @param {String} email
     * @param {Number} size - the size of the image to return
     */
    $scope.gravatar = function(email, size) {
      return 'http://www.gravatar.com/avatar/' + md5(email) + '?s=' + size;
    };

  }])

  /**
   * List controller 
   * @class ListCtrl
   * @module Geektic
   */
  .controller('ListCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    /**
     * Fetch the first geeks from zero to the given limit
     * @method $scope.fetchGeeks
     * @param {Number} limit - the number of geeks to return
     */
    $scope.fetchGeeks = function(limit) {
      return $scope.geeks.slice(0,limit);
    };
  }])


  /**
   * Scrolling directive 
   * @class appScroll
   * @module Geektic
   */
  .directive('appScroll', function() {
    /**
     * Scroll down the page when a 'more' message is recieved
     * @method appScroll
     * @param {Obecjt} $scope - current $scope
     */
    var appScroll = function($scope) {
      $scope.$on('more', function() {
        TweenMax.to(window, 0.5, {delay:0.9, scrollTo:"max", ease:Power2.easeOut});
      });
    };
    return appScroll;
  })
  
  /**
   * Details directive 
   * @class appFocus
   * @module Geektic
   */
  .directive('appFocus', ['$rootScope','$compile','$animator',function($rootScope, $compile, $animator) {
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
