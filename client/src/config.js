app.config(function($sceProvider, $httpProvider){
  // prevent browsers(IE) from caching $http responses
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {
      'Cache-Control':'no-cache',
      'Pragma':'no-cache'
    };
  };

  $sceProvider.enabled(false);

  // Inject auth token into the headers of each request
  $httpProvider.interceptors.push(function($q, $location, $localStorage, $rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:start');
        // send token header with requests
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.token = $localStorage.token;
        }
        return config || $q.when(config);
      },
      response: function (response) {
        $rootScope.$broadcast('loading:finish');
        return response || $q.when(response);
      },
      responseError: function(response) {
        $rootScope.$broadcast('loading:finish');
        if(response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });
});
