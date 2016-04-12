angular.module('chatApp').controller('registerController', ['$scope','$http', function($scope, $http){


  $scope.register = function(){
    var newUser = {
      email: $scope.email,
      password: $scope.password,
      username: $scope.username
    };
    $http.post('/users/register', newUser).then(function(){
      alert('success');
    });
  }


}]);