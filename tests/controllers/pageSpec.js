define(['angular', 'angular-mocks', 'bz.pages/controllers/page'], function (angular) {

    describe('bz.pages.controllers.page', function () {
        var scope, createController, httpBackend, routeSegment;
        beforeEach(module('bz.pages'));
        beforeEach(inject(['$controller', '$rootScope', 'bz.pages.factories.page', '$httpBackend', '$routeSegment',
            function($controller, $rootScope, pageResource, $httpBackend, $routeSegment){
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            routeSegment = $routeSegment;
            httpBackend.whenGET('/api/v1/pages/1').respond(200, {
                title: 'Test'
            });
            httpBackend.whenGET('/api/v1/pages/2').respond(404, { 'id': 'Page not found' });
            httpBackend.whenPUT('/api/v1/pages?action=view').respond(200);

            createController = function(page) {
                return $controller('bz.pages.controllers.page', { $scope: scope, page: page });
            };
        }]));
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('open page', inject(function () {
            routeSegment.$routeParams = { id: '1' };
            createController({ id: 1, title: 'Test' });

            httpBackend.expectPUT('/api/v1/pages/1?action=view').respond(200);
            scope.$apply();
            httpBackend.flush();

            expect(scope.page.title).toEqual('Test');
        }));

        it('page not found', inject(function () {
            routeSegment.$routeParams = { id: '2' };
            createController(null);

            scope.$apply();
        }));
    });

});