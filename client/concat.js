app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: './main/main.html',
      controller: 'MainCtrl'
    })

  $urlRouterProvider.otherwise('/');
})

app.controller('MainCtrl', function($scope) {

})
