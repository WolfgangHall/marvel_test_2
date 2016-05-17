angular.module('marvelApp', [
  'ui.router'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: '../partials/partial-home.html',
        controller: 'homeController'
      });


  $locationProvider.html5Mode(true);
}]);

