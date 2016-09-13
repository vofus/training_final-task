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

            // выполняем обработку ответа
            function transformFetchedData(data) {
                console.info('Data download from server');
                var courses = data.courses,
                    authors = data.authors;

                store.data = {};
                store.data.courses = [];
                store.data.authors = [];

                Object.keys(courses).forEach(function(id) {
                    var course = data.courses[id];
                    course.id = id;
                    store.data.courses.push(course);
                });

                Object.keys(authors).forEach(function(id) {
                    var author = authors[id];
                    author.id = id;
                    store.data.authors.push(author);
                });

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
                        console.log('Edit item: ', coursesArr[i]);
                        return $q.when(coursesArr[i]);
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
                var coursesArr = store.data.courses,
                    coursesLength = coursesArr.length;
                for (var i = 0; i < coursesLength; i++) {
                    if (coursesArr[i].id === id) {
                        console.log('Remove item: ', coursesArr[i]);
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

            //выполняем обработку ответа
            function transformData() {
                console.info('Data update on server', item);
                var coursesArr = store.data.courses,
                    coursesLength = coursesArr.length;
                for (var i = 0; i < coursesLength; i++) {
                    if (coursesArr[i].id === id) {
                        store.data.courses.splice(i, 1, editedItem);
                        break;
                    }
                }
                return store.data;
            }
        }

        function patchSameItems(items) {
            var funcArr = [];
            Object.keys(items).forEach(function(id) {
                funcArr.push(factory.patchItem(id, items[id]));
            });
            return $q.all(funcArr)
                .then(function() {
                    return store.data;
                });
        }
    }

    module.exports = dataStore;
})();