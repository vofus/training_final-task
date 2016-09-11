(function() {
    'use strict';

    var loginCtrl = require('./login.controller'),
        loginDir  = require('./login.directive');

    var login = angular.module('login', []);

    login
        .config(configState)
        .directive('login', loginDir)
        .controller('loginCtrl', loginCtrl);

    configState.$inject = ['$stateProvider'];

    function configState($stateProvider) {
        var loginState = {
            name: 'login',
            url: '/login',
            template: '<login></login>',
            data: {
                requireLogin: false
            }
        };

        $stateProvider.state(loginState);
    }

    module.exports = login;
})();