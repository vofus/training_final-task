(function() {
    'use strict';

    var temp = require('./authorizedUser.template.html'),
        ctrl = require('./authorizedUser.controller');
    
    function authorizedUserDir() {
        var directive = {
            restrict: 'E',
            template: temp,
            controller: ctrl,
            controllerAs: 'headerVM',
            replace: true
        };

        return directive;
    }

    module.exports = authorizedUserDir;
})();