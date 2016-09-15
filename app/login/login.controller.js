(function() {
    'use strict';

    LoginCtrl.$inject = ['auth'];

    function LoginCtrl(auth) {
        var vm = this;

        vm.methods = {
            signUp: signUp
        };

        function signUp() {
            auth.signUp(vm.login, vm.password);
        }
    }

    module.exports = LoginCtrl;
})();