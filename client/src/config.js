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
});
