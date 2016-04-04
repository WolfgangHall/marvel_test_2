angular.module('chatApp').controller('registerController', ['$scope', function($scope){
    $scope.submitForm = function(isValid) {
  //   if (isValid) {
  //     alert('our form is amazing');
  //   }
  // };
  
  $scope.userData = {};

    $scope.register = function(){
      var data = {
        username: $scope.username,
        password: $scope.password,
        email: $scope.email
      };
      console.log(data);
    };

  };

}]);