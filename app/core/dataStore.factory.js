(function() {
    'use strict';

    dataStore.$inject = ['$q', 'dataService', 'COURSES_URL'];

    function dataStore($q, dataService, COURSES_URL) {
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

            function transformFetchedData(data) {
                console.info('Data download from server');
                console.log(data);

                store.data = {};
                store.data.courses = [];
                store.data.authors = [];

                // выполняем обработку ответа
                for (var id in data.courses) {
                    store.data.courses.push({
                        id: id,
                        course: data.courses[id]
                    });
                }
                for (var id in data.authors) {
                    store.data.authors.push({
                        id: id,
                        course: data.authors[id]
                    });
                }
                console.log('TEST GetData!!!', store.data);
                return store.data;
            }
        }

        function getCourseById(id) {
            if (!store.data) {
                return factory.getData()
                    .then(function(data) {
                        var course = data.courses[id];
                        return course;
                    });
            }
            if (!!store.data) {
                var coursesArr = store.data.courses,
                    coursesLength = coursesArr.length;

                for (var i = 0; i < coursesLength; i++) {
                    if (coursesArr[i].id === id) {
                        console.log('Edit item: ', coursesArr[i].course);
                        return $q.when(coursesArr[i].course);
                        break;
                    }
                }
            }
        }

        function postItem(item) {
            return dataService.processingData('POST', COURSES_URL + 'courses.json', item)
                .then(transformData)
                .catch(function(status) {
                    console.warn('Не удалось загрузить данные на сервер!', status);
                });

            function transformData(response) {
                console.info('Data upload on server');
                console.log(response);
                store.data.courses.push({
                    id: response.name,
                    course: item
                });

                //выполняем обработку ответа
                // return store.data;
            }
        }

        function deleteItem(id) {
            return dataService.processingData('DELETE', COURSES_URL + 'courses/' + id + '.json')
                .then(transformData)
                .catch(function(status) {
                    console.warn('Не удалось удалить элемент!', status);
                });

            function transformData() {
                //выполняем обработку ответа
                var coursesArr = store.data.courses,
                    coursesLength = coursesArr.length;
                for (var i = 0; i < coursesLength; i++) {
                    if (coursesArr[i].id === id) {
                        console.log('Remove item: ', coursesArr[i].course);
                        coursesArr.splice(i, 1);
                        break;
                    }
                }
                console.log(store.data);
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

            function transformData() {
                //выполняем обработку ответа
                console.info('Data update on server', item);
                var coursesArr = store.data.courses,
                    coursesLength = coursesArr.length;
                for (var i = 0; i < coursesLength; i++) {
                    if (coursesArr[i].id === id) {
                        store.data.courses[i].course = editedItem;
                        break;
                    }
                }
                return store.data;
            }
        }

        function patchSameItems(items) {
            var funcArr = [];
            for (var id in items) {
                funcArr.push(factory.patchItem(id, items[id]));
            }
            return $q.all(funcArr)
                .then(function() {
                    return store.data;
                });
        }
    }

    module.exports = dataStore;
})();