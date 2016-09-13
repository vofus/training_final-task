(function() {
    'use strict';

    coursesListCtrl.$inject = ['$state', 'dataStore'];

    function coursesListCtrl($state, dataStore) {
        var vm = this;

        vm.data = {};
        vm.checkedCourses = {};
        vm.allChecked = false;
        vm.allCheckedDisable = false;
        vm.disableArchive = true;
        vm.searchText = '';
        vm.sortProp = 'id';
        vm.sortReverse = false;

        vm.methods = {
            addNew: addNew,
            remove: remove,
            editCheckedCourses: editCheckedCourses,
            chooseAll: chooseAll,
            archiveCourses: archiveCourses,
            unarchiveCourse: unarchiveCourse,
            sortBy: sortBy
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
            if (item.checked && !item.archived) {
                vm.checkedCourses[id] = item;
                _checkAvailable();
                return;
            }
            if (!item.checked && !item.archived) {
                delete vm.checkedCourses[id];
                _checkAvailable();
                return;
            }
        }

        function chooseAll() {
            if (vm.allChecked) {
                vm.data.courses.forEach(function(item) {
                    if (item.archived) return;
                    item.checked = true;
                    editCheckedCourses(item.id, item);
                });
                console.log(vm.checkedCourses);
            }
            if (!vm.allChecked) {
                vm.data.courses.forEach(function(item) {
                    if (item.archived) return;
                    item.checked = false;
                    editCheckedCourses(item.id, item);
                });
                console.log(vm.checkedCourses);
            }
        }

        function archiveCourses() {
            Object.keys(vm.checkedCourses).forEach(function(id) {
                vm.checkedCourses[id].archived = true;
            });
            console.log(vm.checkedCourses);
            dataStore.patchSameItems(vm.checkedCourses)
                .then(function(data) {
                    console.log(data);
                    vm.checkedCourses = {};
                    _updateData(data);
                });
        }

        function unarchiveCourse(id, course) {
            course.archived = false;
            course.checked = false;
            dataStore.patchItem(id, course)
                .then(_updateData);
        }

        function sortBy(prop) {     // prop: {string};
            vm.sortProp = prop;
            vm.sortReverse = !vm.sortReverse;
        }

        function _activate() {
            dataStore.getData()
                .then(_updateData);
        }

        function _updateData(data) {
            vm.data = angular.copy(data);
            _checkChooseAll();
            _checkAvailable();
            console.info('Fetch COMPLETE!');
        }

        function _checkChooseAll() {
            var check = vm.data.courses.every(checkFunc);

            if (check) {
                vm.allChecked = true;
                vm.allCheckedDisable = true;
            }
            if (!check) {
                vm.allChecked = false;
                vm.allCheckedDisable = false;
            }

            function checkFunc(item) {
                return item.archived === true;
            }
        }

        function _checkAvailable() {
            if (Object.keys(vm.checkedCourses).length > 0) {
                vm.disableArchive = false;
            } else {
                vm.disableArchive = true;
            }
        }
    }

    module.exports = coursesListCtrl;
})();