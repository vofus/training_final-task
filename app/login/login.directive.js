(function() {
    'use strict';

    var loginCtrl = require('./login.controller'),
        loginTemp = require('./login.template.html');

    function LoginDirective() {
        var directive = {
            restrict: 'E',
            template: loginTemp,
            controller: loginCtrl,
            controllerAs: 'loginVM'
        };

        return directive;
    }

    module.exports = LoginDirective;
})();