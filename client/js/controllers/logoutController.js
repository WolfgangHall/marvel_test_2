angular.module('chatApp')
  .controller('logoutController', function($rootScope, $scope, $http, $cookies){
    $scope.logout = function(){
      $cookies.remove('token');
      $cookies.remove('currentUserEmail');
      $rootScope.token = null;
      $rootScope.currentUser = null;
    }
  });