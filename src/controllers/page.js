define([
    'bz.pages/app',

    'bz.pages/factories/page'
], function(app) {
    'use strict';

    app.controller('bz.pages.controllers.page',
        ['$scope', 'page', 'bz.pages.factories.page', function($scope, page, PageFactory) {
            if (page) {
                $scope.page = page;
                PageFactory.hit({ 'id': page.id });
            }
        }]);

});