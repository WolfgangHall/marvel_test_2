angular.module('marvelApp').controller('characterCtrl', ['$http', function($http){

    var vm = this;

    vm.title = 'Search by Character:';

    vm.errorMsg = '';
    vm.comicErrorMsg = '';
    
    vm.hero = '';
    vm.heroID = '';
    
    vm.data;
    vm.comicData;
    vm.eventData;

    vm.quantity = 4;

    vm.getCharacter = getCharacter;



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
            vm.heroID = response.data.results.data[0].id;
            vm.imgExtension = response.data.results.data[0].thumbnail.extension;
            vm.thumbnail = response.data.results.data[0].thumbnail.path + "/portrait_incredible." + 
                vm.imgExtension;


            getComics(vm.heroID);
            getEvents(vm.heroID);


        }, function myError(response){
            vm.errorMsg = response.statusText;
            console.log(vm.errorMsg);
        });
    }

    function getComics(id) {
        $http({
            method: "GET",
            data: {
                format: 'json'
            },
            url: "http://localhost:8080/character/comicsByHeroId/" + id
        }).then(function mySuccess(response){

            vm.comicData = response.data.results.data;

        }, function myError(response){
            vm.comicErrorMsg = response.statusText;
            console.log(vm.comicErrorMsg);
        });
    }    


    function getEvents(id) {
        $http({
            method: "GET",
            data: {
                format: 'json'
            },
            url: "http://localhost:8080/character/eventsByHeroId/" + id
        }).then(function mySuccess(response){
            vm.eventData = response.data.results.data;

        }, function myError(response){
            vm.eventErrorMsg = response.statusText;
            console.log(vm.eventErrorMsg);
        });
    }    


}]);