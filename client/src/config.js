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
  })
  .state('posts', {
    url:'/posts',
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  })
  .state('register', {
    url:'/register',
    templateUrl: 'auth/register.html'
  })
  .state('login', {
    url:'/login',
    templateUrl: 'auth/login.html'
  })
  .state('logout', {
    url:'/logout',
    templateProvider: function(Auth, $state){
      Auth.logout();
      $state.go('main');
    }
  });

  // Inject auth token into the headers of each request
  $httpProvider.interceptors.push(function($q, $location, $localStorage) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.token = $localStorage.token;
        }
        return config;
      },
      responseError: function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });

  // catchall route
  $urlRouterProvider.otherwise('/');
});
