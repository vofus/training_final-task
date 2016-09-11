(function() {
    'use strict';

    var authorizedUserCtrl = require('./authorizedUser.controller'),
        authorizedUserDir  = require('./authorizedUser.directive');

    var authorizedUser = angular.module('authorizedUser', []);

    authorizedUser
        .config(configState)
        .directive('authUserHeader', authorizedUserDir)
        .controller('authorizedUserCtrl', authorizedUserCtrl);

    configState.$inject = ['$stateProvider'];

    function configState($stateProvider) {
        var authUserState = {
            abstract: true,
            name: 'authUserState',
            template: '<auth-user-header/>'
        };

        $stateProvider.state(authUserState);
    }

    module.exports = authorizedUser;
})();