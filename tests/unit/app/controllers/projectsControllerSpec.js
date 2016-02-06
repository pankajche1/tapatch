/*global describe, it, beforeEach, inject, expect*/
(function () {
		'use strict()';

	describe('Projects Controller', function () {
		var ctrl, scope, store;
		beforeEach(module('app'));
		beforeEach(inject(function (_$httpBackend_,$controller, $rootScope) {
			$httpBackend = _$httpBackend_;
						var projects = [
			/// first project
			{
				'name':'Ayuroma Centre 2',
				'website':'www.ayuromacentre.com'
			},
			/// second project
			{
				'name':'Tech Media Web Project',
				'website':'www.pankajche1.appspot.com'
			}
		];// projects list
		$httpBackend.expectGET('/projects').
			respond(projects);
			scope = $rootScope.$new();
			// get the controller:
			ctrl = $controller('ProjectsController', {
				$scope: scope
			});
		}));


		// Load the module containing the app, only 'ng' is loaded by default.
		//beforeEach(module('todomvc'));
		it('should have a non-null controller', function () {
			expect(ctrl).not.toBe(null);
		});
		
		it('should have two projects in the list', function () {
			pending();
			var projects = scope.projects;
			expect(projects).not.toBe(null);
			expect(projects.length).toBe(2);
		});
		it('should have correct first project', function () {
			pending();
			var projects = scope.projects;
			project = projects[0];
			expect(project).not.toBe(null);
			expect(project.name).toBe('Ayuroma Centre');
		});
		it('should download the projects',function(){
			// at first it should have any projects:
			expect(scope.projects).not.toBe(null);
			//expect(scope.projects.length).toBe(0);
			scope.fetchProjects();
			// now mock load
			$httpBackend.flush();
			var projects = scope.projects;
			expect(projects).not.toBe(null);
			expect(projects.length).toBe(2);
			var project = projects[0];
			expect(project).not.toBe(null);
			expect(project.name).toBe('Ayuroma Centre 2' );


		
		});

	});
}());
