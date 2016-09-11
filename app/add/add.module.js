(function() {
    'use strict';

    var addCtrl = require('./add.controller'),
        addDir  = require('./add.directive');

    var add = angular.module('add', []);

    add
        .config(configState)
        .directive('add', addDir)
        .controller('addCtrl', addCtrl);

    configState.$inject = ['$stateProvider'];

    function configState($stateProvider) {
        var addState = {
            parent: 'authUserState',
            name: 'add',
            url: '/courses/add',
            template: '<add />'
        };

        $stateProvider.state(addState);
    }

    module.exports = add;
})();