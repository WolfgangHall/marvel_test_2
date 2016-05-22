angular.module('marvelApp').controller('seriesCtrl', ['$http', function($http){
    
    var vm = this;

    vm.title = 'Search by Series:';

    vm.seriesData;
    vm.errorMsg= '';
    vm.getSeries = getSeries;
    vm.name = '';

    function getSeries(title) {
        $http({
            method: "GET",
            data: {
                format: 'json'
            },
            url: "http://localhost:8080/series/seriesByTitle/" + title
        }).then(function mySuccess(response){

            vm.seriesData = response.data;

            console.log(vm.seriesData);


        }, function myError(response){
            vm.errorMsg = response.statusText;
            console.log(vm.errorMsg);
        });
    }

}]);