angular.module('marvelApp').controller('characterCtrl', ['$http', '$scope', function($http, $scope){

    var vm = this;

    vm.title = 'Search by Character:';

    vm.errorMsg = '';
    vm.hero = '';
    vm.data;
    vm.getCharacter = getCharacter;

    // character info
    vm.name = '';
    vm.thumbnail = '';
    vm.description = '';

    vm.comics = [];
    vm.series = [];
    vm.events = [];

    function getCharacter(hero) {
        $http({
            method: "GET",
            data: {
                format: 'json'
            },
            url: "http://localhost:8080/character/heroByName/" + hero
        }).then(function mySuccess(response){

            vm.data = response.data;
            vm.name = response.data.results.data[0].name;
            vm.description = response.data.results.data[0].description;
            vm.imgExtension = response.data.results.data[0].thumbnail.extension;
            vm.thumbnail = response.data.results.data[0].thumbnail.path + "/portrait_incredible." + 
                vm.imgExtension;

            vm.comics.push(response.data.results.data[0].comics.items[0]);
            vm.comics.push(response.data.results.data[0].comics.items[1]);
            vm.comics.push(response.data.results.data[0].comics.items[2]);
            vm.comics.push(response.data.results.data[0].comics.items[3]);
            vm.comics.push(response.data.results.data[0].comics.items[4]);            

            vm.events.push(response.data.results.data[0].events.items[0]);
            vm.events.push(response.data.results.data[0].events.items[1]);
            vm.events.push(response.data.results.data[0].events.items[2]);
            vm.events.push(response.data.results.data[0].events.items[3]);
            vm.events.push(response.data.results.data[0].events.items[4]);            

            vm.series.push(response.data.results.data[0].series.items[0]);
            vm.series.push(response.data.results.data[0].series.items[1]);
            vm.series.push(response.data.results.data[0].series.items[2]);
            vm.series.push(response.data.results.data[0].series.items[3]);
            vm.series.push(response.data.results.data[0].series.items[4]);

            console.log(vm.comics);

            console.log(vm.data);

        }, function myError(response){
            vm.errorMsg = response.statusText;
            console.log(vm.errorMsg);
        });
    }

    

}]);