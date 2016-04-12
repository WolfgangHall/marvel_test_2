angular.module('chatApp')
  .controller('logoutController', function($rootScope, $scope, $http, $cookies, $location){
    $scope.logout = function(){
      $cookies.remove('token');
      $cookies.remove('currentUserEmail');
      $rootScope.token = null;
      $rootScope.currentUser = null;

      $location.path('/');

      bootbox.alert('Successfully ended session!');
    }
  });