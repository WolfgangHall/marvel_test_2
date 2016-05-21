angular.module('marvelApp', [
  'ui.router',
  'ngResource'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../partials/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
      })      

      .state('charSelect', {
        url: '/charSelect',
        templateUrl: '../partials/character.html',
        controller: 'characterCtrl',
        controllerAs: 'character'
      })    

      .state('comicSelect', {
        url: '/comicSelect',
        templateUrl: '../partials/comic.html',
        controller: 'comicCtrl',
        controllerAs: 'comic'
      })      

      .state('seriesSelect', {
        url: '/seriesSelect',
        templateUrl: '../partials/series.html',
        controller: 'seriesCtrl',
        controllerAs: 'series'
      })      

      .state('storySelect', {
        url: '/storySelect',
        templateUrl: '../partials/stories.html',
        controller: 'storiesCtrl',
        controllerAs: 'story'
      });


  $locationProvider.html5Mode(true);
}]);

