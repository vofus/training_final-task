(function() {
    'use strict';

    var editDir  = require('./edit.directive'),
        editCtrl = require('./edit.controller');

    var edit = angular.module('edit', []);

    edit
        .config(configState)
        .directive('edit', editDir)
        .controller('editCtrl', editCtrl);

    configState.$inject = ['$stateProvider'];

    function configState($stateProvider) {
        var editState = {
            parent: 'authUserState',
            name: 'edit',
            url: '/courses/edit/:id',
            template: '<edit />'
        };

        $stateProvider.state(editState);
    }

    module.exports = edit;
})();