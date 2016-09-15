(function() {
    'use strict';

    editCtrl.$inject = ['$state', '$stateParams', 'dataStore'];

    function editCtrl($state, $stateParams, dataStore) {
        var vm = this;

        vm.data = {
            id: null,
            course: null
        };

        vm.methods = {
            save: save,
            cancel: cancel
        };

        _getCourse();

        function _getCourse() {
            vm.data.id = $stateParams.id;

            dataStore.getCourseById(vm.data.id)
                .then(function(course) {
                    vm.data.course = angular.copy(course);
                });
        }

        function save() {
            dataStore.patchItem(vm.data.id, vm.data.course)
                .then(function() {
                    $state.go('courses');
                });
        }

        function cancel() {
            $state.go('courses');
        }
    }

    module.exports = editCtrl;
})();