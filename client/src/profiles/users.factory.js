app.factory('User', function($http) {
  return {
    get: function(id){
      return $http.get('/api/users/'+id)
      .then(function(resp){
        return resp.data
      }).catch(function(err){
        return err
      });
    }
  }
});
