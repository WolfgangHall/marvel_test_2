angular.module('chatApp')
  .factory('Socket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]);