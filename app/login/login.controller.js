(function() {
    'use strict';

    LoginCtrl.$inject = ['auth'];

    function LoginCtrl(auth) {
        var vm = this;

        vm.methods = {
            signUp: signUp
        };

        console.log('Test! LoginCtrl!');
        console.log('================');
        // console.log(vm.test);
        function signUp() {
            console.log(vm.login, vm.password);
            auth.signUp(vm.login, vm.password);
        }
    }

    module.exports = LoginCtrl;
})();