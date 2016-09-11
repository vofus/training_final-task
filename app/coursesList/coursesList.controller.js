(function() {
    'use strict';

    coursesListCtrl.$inject = ['$state', '$timeout', 'dataStore'];

    function coursesListCtrl($state, $timeout, dataStore) {
        var vm = this;

        vm.data = {};
        vm.checkedCourses = {};
        vm.searchText = '';

        vm.methods = {
            addNew: addNew,
            remove: remove,
            editCheckedCourses: editCheckedCourses,
            archiveCourses: archiveCourses,
            unarchiveCourse: unarchiveCourse,
            filterCourses: filterCourses
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

        function filterCourses() {
            $timeout(transformFunc('title', vm.searchText), 1000);

            function transformFunc(prop, pattern) {
                var regExp = new RegExp(pattern, 'i');
                dataStore.getData()
                    .then(_updateData)
                    .then(processingFunc);

                function processingFunc() {
                    for (var id in vm.data.courses) {
                        if (!regExp.test(vm.data.courses[id][prop])) {
                            delete vm.data.courses[id];
                        }
                    }
                }
            }
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