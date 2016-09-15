(function() {
    'use strict';

    addCtrl.$inject = ['$state', 'dataStore'];

    function addCtrl($state, dataStore) {
        var vm = this;

        vm.data = {};

        vm.methods = {
            add: add,
            cancel: cancel
        };

        _checkDataStore();

        function add() {
            console.log(vm.data.course);
            dataStore.postItem(vm.data.course)
                .then(function() {
                    $state.go('courses');
                });
        }

        function cancel() {
            $state.go('courses');
        }

        function _checkDataStore() {
            dataStore.getData()
                .then(function(data) {
                    console.info('Data updated!');
                });
        }
    }

    module.exports = addCtrl;
})();