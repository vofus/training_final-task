(function() {
    'use strict';

    authorizedUserCtrl.$inject = ['auth'];

    function authorizedUserCtrl(auth) {
        var vm = this;

        vm.methods = {
            signOut: signOut
        };

        function signOut() {
            console.log('SignOut');
            auth.signOut();
        }
    }

    module.exports = authorizedUserCtrl;
})();