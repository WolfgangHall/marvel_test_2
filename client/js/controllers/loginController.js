angular.module('chatApp').controller('loginController', ['$scope', '$http', '$rootScope', '$cookies', '$location', function($scope, $http, $rootScope, $cookies, $location){
  
  $scope.login = function(){
    $http.put('/users/login', {email: $scope.email, password: $scope.password})
      .then(function(res){
        $cookies.put('token', res.data.token);
        $cookies.put('currentUserEmail', $scope.email);
        $rootScope.token = res.data.token;
        $rootScope.currentUserEmail = $scope.email;

        $scope.email = '';
        $scope.password = '';
        
        bootbox.alert('Successfully Logged In!');
        
        $location.path('/upload');
      }, function(err){
        bootbox.alert('Bad Login Credentials!');
      });
  }


}]);