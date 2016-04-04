angular.module('chatApp').controller('registerController', ['$scope','$http', function($scope, $http){

    $scope.register = function(){
      var data = {
        username: $scope.username,
        password: $scope.password,
        email: $scope.email
      };
      console.log(data);
  $http({
      method: "POST",
      url: "/register",
      data:data
    }).then(function(result){
        console.log(result);
    });
  
  };
}]);