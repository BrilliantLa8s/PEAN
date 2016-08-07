app.config(function($locationProvider, $sceProvider, $stateProvider, $urlRouterProvider, $httpProvider){
  // prevent browsers(IE) from caching $http responses
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {
      'Cache-Control':'no-cache',
      'Pragma':'no-cache'
    };
  };
  $sceProvider.enabled(false);
  // routing
  $locationProvider.html5Mode(true).hashPrefix('!');
  $stateProvider
  .state('main', {
    url:'/',
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
  // catchall route
  $urlRouterProvider.otherwise('/');
});
