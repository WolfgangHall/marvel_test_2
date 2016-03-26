var app = angular.module('chatApp', [
  'ui.router',
  'ng-Animate',
  'ui.bootstrap',
  'btford-socket.io'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../partials/partial-home.html',
        controller: 'homeController'
      })

      .state('chat', {
        url: '/chat',
        templateUrl: '../partials/partial-chatroom.html',
        controller: 'chatController'
      })


  $locationProvider.html5Mode(true);
}]);