angular.module('chatApp').controller('registerController', ['$scope', function($scope){
  var vm = this;

  vm.userData = {};

  vm.addUser = function() {
    vm.users.push({
      username: vm.userData.username,
      password: vm.userData.password,
      email: vm.userData.email
    });

    vm.userData = {};
  }
}]);