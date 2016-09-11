(function() {
    'use strict';

    coursesListCtrl.$inject = ['$state', '$stateParams', 'dataStore'];

    function coursesListCtrl($state, $stateParams, dataStore) {
        var vm = this;

        vm.data = {};
        vm.checkedCourses = {};

        vm.methods = {
            addNew: addNew,
            remove: remove,
            editCheckedCourses: editCheckedCourses,
            archiveCourses: archiveCourses,
            unarchiveCourse: unarchiveCourse
        };

        _activate();

        function addNew() {
            $state.go('add');
        }

        function remove(id) {
            var confirmRemove = confirm('Вы действительно хотите удалить этот курс?');
            if (confirmRemove) {
                dataStore.deleteItem(id)
                    .then(_updateData);
            }
        }

        function editCheckedCourses(id, item) {
            if (item.checked) {
                vm.checkedCourses[id] = item;
            }
            if (!item.checked) {
                delete vm.checkedCourses[id];
            }
        }

        function archiveCourses() {
            for (var id in vm.checkedCourses) {
                vm.checkedCourses[id].archived = true;
            }
            console.log(vm.checkedCourses);
            dataStore.patchSameItems(vm.checkedCourses)
                .then(function(data) {
                    console.log(data);
                    _updateData(data);
                });
        }

        function unarchiveCourse(id, course) {
            course.archived = false;
            course.checked = false;
            dataStore.patchItem(id, course)
                .then(_updateData);
        }

        function _activate() {
            dataStore.getData()
                .then(_updateData);
        }

        function _updateData(data) {
            vm.data = angular.copy(data);
            console.info('Fetch COMPLETE!');
        }
    }

    module.exports = coursesListCtrl;
})();