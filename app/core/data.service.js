(function() {
    'use strict';

    dataService.$inject = ['$http'];

    function dataService($http) {
        this.processingData = processingData;

        function processingData(method, url, dataItem) {
            var config = {
                method: method,
                url: url,
                data: dataItem
            };
            return $http(config)
                .then(procesingDataComplete)
                .catch(function(data, status) {
                    return status;
                });

            function procesingDataComplete(data) {
                return data.data;
            }
        }
    }

    module.exports = dataService;
})();