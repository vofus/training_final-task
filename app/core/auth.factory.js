(function() {
    'use strict';

    authFactory.$inject = ['$state'];

    function authFactory($state) {
        var _authData = {
            login: 'vofus',
            password: '123'
        };

        var _store = window.sessionStorage;

        var _methods = {
            getAuthState: getAuthState,
            signUp: signUp,
            signOut: signOut
        };

        return _methods;

        function getAuthState() {
            return JSON.parse(_store.getItem('auth'));
        }

        function signUp(login, password) {
            if (login === _authData.login && password === _authData.password) {
                _store.setItem('auth', true);
                $state.go('courses');
            } else {
                _store.setItem('auth', false);
                alert('Неверный логин или пароль');
            }
        }

        function signOut() {
            _store.setItem('auth', 'false');
            $state.go('login');
        }
    }

    module.exports = authFactory;
})();