var angular = require('angular');
var router = require('angular-ui-router');

/* =========================== */

var core = require('./core/core.module'),
    login = require('./login/login.module'),
    authorizedUser = require('./authorizedUser/authorizedUser.module'),
    coursesList = require('./coursesList/coursesList.module'),
    edit = require('./edit/edit.module'),
    add = require('./add/add.module');

var app = angular.module('app',[
    router,
    'core',
    'login',
    'authorizedUser',
    'coursesList',
    'edit',
    'add'])
    .run(runAppFunc);


/*=============== Help Functions ============= */
runAppFunc.$inject = ['$rootScope', '$state', 'auth'];

function runAppFunc($rootScope, $state, auth) {
    $rootScope.$on('$stateChangeStart', changeState);

    function changeState(event, toState, toParams, fromState) {
        if (toState.name !== 'login' && !auth.getAuthState()) {
            event.preventDefault();
            $state.go('login');
            alert('Необходимо войти в систему');
        } else if (toState.name === 'login' && auth.getAuthState()) {
            event.preventDefault();
            $state.go('courses');
        }

    }
}
