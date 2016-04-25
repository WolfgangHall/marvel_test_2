angular.module('chatApp').controller('userProfileController', ['$scope','$http', function($scope, $http){

  $scope.uploadImg = function(){
      var data = {
      userImg: $scope.image,
      };
        console.log(data);
  $http({
    method: "POST",
    url: "/profile",
    data:data
    }).then(function(result){
        console.log(result);
      });
    };

  // var image = new Image();
  //   image.src = 'data-jdenticon-hash="{{currentUserHash}}"';
  //   image.onload = function() {
  //   context.drawImage(image, 200, 200);
  // };

}]);