(function() {
    'use strict';

    var temp = require('./coursesList.template.html'),
        ctrl = require('./coursesList.controller');

    function coursesListDir() {
        var directive = {
            restrict: 'E',
            template: temp,
            controller: ctrl,
            controllerAs: 'listVM',
            replace: true
        };
        return directive;
    }

    module.exports = coursesListDir;
})();