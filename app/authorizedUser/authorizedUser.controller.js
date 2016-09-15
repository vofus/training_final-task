(function() {
    'use strict';

    authorizedUserCtrl.$inject = ['auth'];

    function authorizedUserCtrl(auth) {
        var vm = this;

        vm.user = {};

        vm.methods = {
            signOut: signOut
        };

        _initUser();

        function signOut() {
            auth.signOut();
        }

        function _initUser() {
            vm.user = auth.getUserProfile();
        }
    }

    module.exports = authorizedUserCtrl;
})();