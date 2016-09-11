(function() {
    'use strict';

    var temp = require('./edit.template.html'),
        ctrl = require('./edit.controller');

    function editDir() {
        var directive = {
            restrict: 'E',
            replace: true,
            template: temp,
            controller: ctrl,
            controllerAs: 'editVM'
        };

        return directive;
    }

    module.exports = editDir;
})();