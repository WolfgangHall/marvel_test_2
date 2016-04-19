angular.module('chatApp').controller('loginController', ['$scope', '$http', '$rootScope', '$cookies', '$location', '$window', function($scope, $http, $rootScope, $cookies, $location, $window){
  
  $scope.login = function(){
    $http.put('/users/login', {username: $scope.username, password: $scope.password})
      .then(function(res){
        $cookies.put('token', res.data.token);
        $cookies.put('currentUser', $scope.username);
        var hash = md5($scope.username);
        // console.log(hash);
        $cookies.put('currentUserId', res.data.currentUserId);
        $rootScope.token = res.data.token;
        $rootScope.currentUser = $scope.username;
        $rootScope.currentUserId = res.data.currentUserId;

        $scope.username = '';
        $scope.password = '';
        bootbox.alert('Successfully Logged In!');

        
        $location.path('/home');
        $window.location.reload();

      }, function(err){
        bootbox.alert('Bad Login Credentials!');
      });
  }
}]);