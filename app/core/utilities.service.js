(function() {
    'use strict';

    function utilities() {
        this.objectToArray = objectToArray;
        this.createFuncArr = createFuncArr;
        this.findItemById = findItemById;
        this.replaceItemById = replaceItemById;
        this.removeItemById = removeItemById;

        // метод принимает в качестве аргументов объект, который нужно трансформировать {Object},
        // и имя свойства, которое будет добавлено к каждому элементу {String} (необязательный аргумент)
        function objectToArray(obj, propName) {
            var items = [];

            Object.keys(obj).forEach(function(key) {
                var item = obj[key];

                if (!!propName) {
                    item[propName] = key;
                }
                items.push(item);
            });

            return items;
        }

        // метод создает массив из вызывов одной функции с разными аргументами,
        // передавая в качестве аргументов ключ и значение по этому ключу
        // obj = {Object};
        // func = {Function};
        function createFuncArr(obj, func) {
            var funcArr = [];

            Object.keys(obj).forEach(function(key) {
                funcArr.push(func(key, obj[key]));
            });

            return funcArr;
        }

        // метод возвращает объект, найденный в массиве по id,
        // если не находит такого, то возвращается пустой объект
        function findItemById(arr, id) {
            var arrLength = arr.length;
            for (var i = 0; i < arrLength; i++) {
                if (arr[i].id === id) {
                    return arr[i];
                }
            }
            return {};
        }

        // метод возвращает массив с измененным элементом
        // массив с элементами - arr = {Array};
        // id искомого элемента - id = {String};
        // обновленный элемент - newItem = {Object};
        function replaceItemById(arr, id, newItem) {
            var arrLength = arr.length;
            for (var i = 0; i < arrLength; i++) {
                if (arr[i].id === id) {
                    console.info('Data update on server', arr[i]);
                    arr.splice(i, 1, newItem);
                    break;
                }
            }
            return arr;
        }

        // метод возвращает массив с удаленным элементом с указанным id
        function removeItemById(arr, id) {
            var arrLength = arr.length;
            for (var i = 0; i < arrLength; i++) {
                if (arr[i].id === id) {
                    console.log('Remove item: ', arr[i]);
                    arr.splice(i, 1);
                    break;
                }
            }
            return arr;
        }
    }

    module.exports = utilities;
})();