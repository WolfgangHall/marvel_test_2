angular.module('RCBoverflow').controller('feedController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

$scope.getFeed = function(){

$scope.feed = [];
    $http.get('/feed').success(function(data, status, headers, config) {
        $scope.todos = data;
        if (data === "") {
            $scope.feed = [];
        }
    }).error(function(data, status, headers, config) {
        console.log("I done Broke...");
    });

};
///stuff


}]);