angular.module('chatApp').controller('loginController', ['$scope', '$http', '$rootScope', '$cookies', function($scope, $http, $rootScope, $cookies){
  
  $scope.login = function(){
    $http.put('/users/login', {email: $scope.email, password: $scope.password})
      .then(function(res){
        $cookies.put('token', res.data.token);
        $cookies.put('currentUserEmail', $scope.email);
        $rootScope.token = res.data.token;
        $rootScope.currentUserEmail = $scope.email;

        $scope.email = '';
        $scope.password = '';
        alert('successful sign in');
      }, function(err){
        alert('bad login cred');
      });
  }


}]);