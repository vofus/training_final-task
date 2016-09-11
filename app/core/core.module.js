(function() {
    'use strict';

    var dataService = require('./data.service'),
        dataStore = require('./dataStore.factory'),
        coreConfig = require('./core.config'),
        auth = require('./auth.factory');

    var core = angular.module('core', []);

    core
        .constant('COURSES_URL', 'https://front-end-video-courses.firebaseio.com/')
        .config(coreConfig)
        .service('dataService', dataService)
        .factory('dataStore', dataStore)
        .factory('auth', auth);

    module.exports = core;
})();