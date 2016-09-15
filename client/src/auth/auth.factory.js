app.factory('Auth', function($http, $localStorage, $q){
  return {
    // Register/Login
    authenticate: function(creds){
      return $http.post('/api/auth/authenticate', creds)
      .then(function(resp){
        $localStorage.token = resp.data;
        return resp;
      }).catch(function(err){return err});
    },
    // Get Current User
    current: function(){
      return $http.get('/api/auth/current')
      .then(function(resp){
        if(resp.status == 200){
          return resp.data
        } else {
          delete $localStorage.token;
          return {};
        };
      }).catch(function(err){
        delete $localStorage.token;
        return err;
      });
    },
    // Logout/Remove token from storage
    logout: function(){
      return $q(function(resolve, reject){
        delete $localStorage.currentUser;
        delete $localStorage.token;
        if(!$localStorage.token){
          resolve('token deleted');
        } else {reject('could not delete token')};
      })
    }
  }
});
