define([
    'bz.pages/app',

    'bz.pages/factories/category'
], function(app) {
    'use strict';

    app.directive('bzPagesCategory', ['bz.pages.factories.page', 'bz.pages.factories.category', '$parse', '$log',
        function(PageFactory, CategoryFactory, $parse, $log) {
        return {
            restrict: 'AE',
            scope: true,
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.bzPagesCategory)(scope);

                CategoryFactory.get(settings, function(category) {
                    scope.category = category;
                });
                scope.loading = true;
                PageFactory.get(settings, function (pages) {
                    scope.loading = false;
                    scope.pages = pages;
                }, function () {
                    scope.loading = false;
                });
            }
        };
    }]);
});