angular.module('chatApp')
  .controller('roomController', function($scope){

    $scope.rooms = [
      {'name': 'Biology', 'description': 'Discuss the wonders of Bio'},
      {'name': 'Literature', 'description': 'From Steinbeck to Shakespeare'},
      {'name': 'Dark Souls 3', 'description': 'Discuss gameplay from DS3'},
      {'name': 'The Life of Pablo', 'description': "Discuss Kanye West\'s the Life of Pablo"},
      {'name': 'Daredevil', 'description': 'Discuss the Netflix original Daredevil'},
      {'name': 'React JS', 'description': 'Discuss ReactJS projects'}
    ];






    
  });