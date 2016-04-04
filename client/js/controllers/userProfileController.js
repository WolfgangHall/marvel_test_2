angular.module('chatApp').controller('userProfileController', ['$scope','$http', function($scope, $http){

  $scope.uploadImg = function(){
      var data = {
      userImg: $scope.image,
      };
        console.log(data);
  $http({
    method: "POST",
    url: "/upload",
    data:data
  }).then(function(result){
        console.log(result);
    });
  };
    


  }]);