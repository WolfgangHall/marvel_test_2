angular.module('marvelApp').controller('comicCtrl', ['$http', function($http){
    
    var vm = this;

    vm.title = 'Search by Comic:';

    vm.comicId = '';

    vm.comicData;
    vm.getComic = getComic;

    vm.errorMsg = '';



    function getComic(id) {
        $http({
            method: "GET",
            data: {
                format: 'json'
            },
            url: "http://localhost:8080/comics/comicById/" + id
        }).then(function mySuccess(response){

            vm.comicData = response.data;

            console.log(response.data);

        }, function myError(response){
            vm.errorMsg = response.statusText;
            console.log(vm.errorMsg);
        });
    }


}]);