angular.module('directives', [])

  .directive('pageTitle', ['$rootScope',
    function($rootScope){
      function link(scope, element){
        if (scope.suffix == undefined) scope.suffix = true;

        scope.$watch(function(){
           return element.text();
        }, function(title) {
           if (scope.suffix) title += " - Foodbase";

           $('title').text(title);
        });

        scope.$on('$destroy', function(){
          $('title').text($rootScope.defaultTitle);
        })
      }

      return {
        restrict: 'E',
        link: link,
        scope: {
          suffix: '=?'
        },
        transclude: true,
        template: "<div ng-transclude></div>"
      }
    }])

  .directive('bodyClass',
    function(){
      function link(scope, element){
        $('body').addClass(element.text());

        scope.$on('$destroy', function(){
          $('body').removeClass(element.text());
        })
      }

      return {
        restrict: 'E',
        link: link
      }
    })

  .directive('loadingIcon', function() {
    function link(scope){
      if (scope.loaded == undefined){
        scope.loaded = true;
      }

      scope.class = scope.class || "";
    }

    return {
      template: '<div ng-if="!loaded || !$parent.loaded" class="text-center loader"><p><span class="fa fa-circle-o-notch fa-spin text-muted"></span></p></div>' +
                '<div ng-if="loaded && $parent.loaded" class="{{class}}" ng-transclude></div>',
      scope: {
        loaded: '=?',
        class: '@?'
      },
      link: link,
      transclude: true
    };
  })

  .directive('isodate', function(){
    function link(scope, element, attrs){
      scope.$parent.$watch(attrs.isodate, function(){
        $(element).attr('title', moment(scope.iso).format('MMMM Do YYYY [at] hh:mm')).livestamp(scope.iso);
      });

      scope.$on("$destroy", function(){
        $(element).livestamp('destroy');
      });
    }

    return {
      scope: {
        iso: '=isodate'
      },
      restrict: 'A',
      link: link
    }
  })
