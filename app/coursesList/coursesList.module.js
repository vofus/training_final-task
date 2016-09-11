(function() {
    'use strict';

    var coursesListCtrl = require('./coursesList.controller'),
        coursesListDir  = require('./coursesList.directive');

    var coursesList = angular.module('coursesList', []);

    coursesList
        .config(configState)
        .directive('coursesList', coursesListDir)
        .controller('coursesListCtrl', coursesListCtrl);

    configState.$inject = ['$stateProvider'];

    function configState($stateProvider) {
        var coursesState = {
            parent: 'authUserState',
            name: 'courses',
            url: '/courses',
            template: '<courses-list />'
        };

        $stateProvider.state(coursesState);
    }

    module.exports = coursesList;
})();