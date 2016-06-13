app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: './main/main.html',
      controller: 'MainCtrl'
    })

  $urlRouterProvider.otherwise('/');
})
