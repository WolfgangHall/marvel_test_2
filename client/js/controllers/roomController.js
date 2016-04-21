angular.module('chatApp').controller('roomController', ['$scope','$http','$location', '$cookies', function($scope, $http, $location, $cookies){

    // $scope.rooms = [
    //   {'name': 'Biology', 'description': 'Discuss the wonders of Bio'},
    //   {'name': 'Literature', 'description': 'From Steinbeck to Shakespeare'},
    //   {'name': 'Dark Souls 3', 'description': 'Discuss gameplay from DS3'},
    //   {'name': 'The Life of Pablo', 'description': "Discuss Kanye West\'s the Life of Pablo"},
    //   {'name': 'Daredevil', 'description': 'Discuss the Netflix original Daredevil'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'Biology', 'description': 'Discuss the wonders of Bio'},
    //   {'name': 'Literature', 'description': 'From Steinbeck to Shakespeare'},
    //   {'name': 'Dark Souls 3', 'description': 'Discuss gameplay from DS3'},
    //   {'name': 'The Life of Pablo', 'description': "Discuss Kanye West\'s the Life of Pablo"},
    //   {'name': 'Daredevil', 'description': 'Discuss the Netflix original Daredevil'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'},
    //   {'name': 'React JS', 'description': 'Discuss ReactJS projects'}
    // ];


  $scope.getRooms = function(){
      $http.get('/rooms').then(function(response){
        $scope.roomCount = response.data.length;
        $scope.rooms = response.data;
        console.log(response.data.length);
        console.log(response);
      });

  };

  $scope.createRoom = function(){
    var newRoom = {
      roomName: $scope.roomName,
      moderator: $cookies.get('currentUser'),
      description: $scope.roomDescription,
      roomNameTrim: $scope.roomName.replace(/ /g, '')
    };
    console.log(newRoom);
    $http.post('/createRoom', newRoom).then(function(){
      $scope.roomName = '';
      $scope.moderator = '';
      $scope.description = '';
      $scope.roomNameTrim = '';

      $location.path('/createRoom');

      bootbox.alert('Sucessfully created Room.');
    });
  };


}]);