(function() {
    'use strict';

    dataStore.$inject = ['$q', 'utilities', 'dataService', 'COURSES_URL'];

    function dataStore($q, utilities, dataService, COURSES_URL) {
        var store = {},
            factory = {
                getData: getData,
                getCourseById: getCourseById,
                postItem: postItem,
                deleteItem: deleteItem,
                patchItem: patchItem,
                patchSameItems: patchSameItems
            };

        return factory;

        function getData() {
            if (!!store.data) {
                console.info('Data download from store');
                return $q.when(store.data);
            }
            return dataService.processingData('GET', COURSES_URL + '.json')
                .then(transformFetchedData)
                .catch(function(status) {
                    console.warn('Не удалось загрузить данные с сервера!', status);
                });

            // выполняем обработку ответа
            function transformFetchedData(data) {
                console.info('Data download from server');
                var courses = data.courses,
                    authors = data.authors;

                store.data = {};
                store.data.courses = utilities.objectToArray(courses, 'id');
                store.data.authors = utilities.objectToArray(authors, 'id');

                return store.data;
            }
        }

        function getCourseById(id) {
            if (!store.data) {
                return factory.getData()
                    .then(function(data) {
                        var course = {},
                            coursesArr = data.courses;

                        course = utilities.findItemById(coursesArr, id);
                        console.log('Edit item: ', course);

                        return course;
                    });
            }
            if (!!store.data) {
                var course = {};

                course = utilities.findItemById(store.data.courses, id);
                console.log('Edit item: ', course);

                return $q.when(course);
            }
        }

        function postItem(item) {
            return dataService.processingData('POST', COURSES_URL + 'courses.json', item)
                .then(transformData)
                .catch(function(status) {
                    console.warn('Не удалось загрузить данные на сервер!', status);
                });

            //выполняем обработку ответа
            function transformData(response) {
                console.info('Data upload on server');
                console.log(response);

                item.id = response.name;
                store.data.courses.push(item);
            }
        }

        function deleteItem(id) {
            return dataService.processingData('DELETE', COURSES_URL + 'courses/' + id + '.json')
                .then(transformData)
                .catch(function(status) {
                    console.warn('Не удалось удалить элемент!', status);
                });

            //выполняем обработку ответа
            function transformData() {
                store.data.courses = utilities.removeItemById(store.data.courses, id);
                return store.data;
            }
        }

        function patchItem(id, item) {
            var editedItem = angular.copy(item);
            return dataService.processingData('PATCH', COURSES_URL + 'courses/' + id + '.json', item)
                .then(transformData)
                .catch(function(status) {
                    console.warn('Обновление данных на сервере не удалось!', status);
                });

            //выполняем обработку ответа
            function transformData() {
                store.data.courses = utilities.replaceItemById(store.data.courses, id, editedItem);
                return store.data;
            }
        }

        function patchSameItems(items) {
            var funcArr = utilities.createFuncArr(items, factory.patchItem);

            return $q.all(funcArr)
                .then(function() {
                    return store.data;
                });
        }
    }

    module.exports = dataStore;
})();