app.factory('Auth', function($http, $localStorage){
  return {
    // Register/Login
    authenticate: function(creds){
      return $http.post('/api/auth/authenticate', creds)
      .then(function(resp){
        $localStorage.token = resp.data;
        return;
      }).catch(function(err){return err});
    },
    // Get Current User
    current: function(){
      return $http.get('/api/auth/current')
      .then(function(resp){return resp})
      .catch(function(err){return err});
    },
    // Logout/Remove token from storage
    logout: function(){
      delete $localStorage.token;
      return 'user logged out';
    }
  }
});
