(function() {
    'use strict';

    coreConfig.$inject = ['$urlRouterProvider'];

    function coreConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
    }

    module.exports = coreConfig;
})();