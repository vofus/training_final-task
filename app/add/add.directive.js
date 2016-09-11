(function() {
    'use strict';

    var temp = require('./add.template.html'),
        ctrl = require('./add.controller');

    function addDir() {
        var directive = {
            restrict: 'E',
            replace: true,
            template: temp,
            controller: ctrl,
            controllerAs: 'addVM'
        };

        return directive;
    }

    module.exports = addDir;
})();