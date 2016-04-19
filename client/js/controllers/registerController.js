angular.module('chatApp').controller('registerController', ['$scope','$http','$location', function($scope, $http, $location){


  $scope.register = function(){
    var hash = md5($scope.username);
    console.log(hash);
    var newUser = {
      email: $scope.email,
      password: $scope.password,
      username: $scope.username,
      userHash: hash
    };

    $http.post('/users/register', newUser).then(function(){
      $scope.email = '';
      $scope.password = '';
      $scope.username = '';
      $scope.userHash='';

      $location.path('/login');

      bootbox.alert('Sucessfully Registered. Please Log In');
    });
  }


}]);