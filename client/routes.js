var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: './main/main.html'
    })

  $urlRouterProvider.otherwise('/');
})
