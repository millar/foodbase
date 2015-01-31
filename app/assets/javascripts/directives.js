angular.module('directives', [])

  .directive('pageTitle', ['$rootScope',
    function($rootScope){
      function link(scope, element){
        if (scope.suffix == undefined) scope.suffix = true;

        scope.$watch(function(){
           return element.text();
        }, function(title) {
           if (scope.suffix) title += " on Foodbase";

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
      NProgress.start();

      if (scope.loaded == undefined){
        scope.loaded = true;
      }

      scope.class = scope.class || "";

      scope.$watch('loaded', function(loaded){
        if (loaded){
          NProgress.done();
        } else {
          NProgress.start();
        }
      });

      scope.$on('$destroy', function(){
        NProgress.done();
      })
    }

    return {
      template: //'<div ng-if="!loaded || !$parent.loaded" class="text-center loader"><p><span class="fa fa-circle-o-notch fa-spin text-muted"></span></p></div>' +
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

  .directive('ngTypeahead', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        filter: '&',
        ngModel: '=',
        selectedItem: '=',
        limit: '=',
        rateLimitWait: '='
      },
      link: function (scope, element, attrs) {

        var foods = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('id'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          prefetch: attrs.url.replace('%QUERY', ''),
          remote: attrs.url
        });

        foods.initialize();

        if (attrs.limit) {
          construct.limit = attrs.limit;
        }

        if (attrs.rateLimitWait) {
          construct.remote.rateLimitWait = attrs.rateLimitWait;
        }

        element.typeahead(null, {
          source: foods.ttAdapter(),
          displayKey: attrs.valueKey,
          name: 'food-items'
        });

        scope.$watch('selectedItem', function (newValue) {
          if (newValue === '') {
            element.typeahead('setQuery', '');
          }
        }, true);

        element.on('change', function (event) {
          if (attrs.ngModel) {
            scope.ngModel = $(event.target).val();
          }

          scope.$apply();
        });

        element.on('typeahead:selected', function (event, datum, dataset) {
          scope.selectedItem = datum;

          if (attrs.ngModel) {
            scope.ngModel = datum;
          }

          scope.$apply();
          $(event.target).val(datum.name);
        });

        element.on('typeahead:autocompleted', function (event, datum, dataset) {
          scope.selectedItem = datum;

          if (attrs.ngModel) {
            scope.ngModel = datum;
          }

          scope.$apply();
          $(event.target).val(datum.name);

          element.typeahead('close')
        });

        scope.$on('$destroy', function () {
          element.typeahead('destroy');
        });
      }
    };
  });
