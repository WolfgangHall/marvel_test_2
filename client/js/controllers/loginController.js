angular.module('chatApp').controller('loginController', ['$scope', '$http', function($scope, $http){
  
$scope.login = function(){
  var data = { email: $scope.email, password: $scope.password };
  console.log(data);
  $http({
    method: "POST",
    url: "/login",
    data: data
    
  }).then(function(result){
    // console.log(data);
    // console.log(result);
    // $scope.loggedIn === true;
    // $scope.email = result.data.email;
    // $scope.password = result.data.password;
    // console.log(result.data.email);
  });
};


}]);