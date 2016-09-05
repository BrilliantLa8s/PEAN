app.factory('Identity', function(Resource, $http, $rootScope){
  return {
    connect: function(provider){
      return $http.post('/api/auth/authorize', {provider:provider})
      .then(function(resp){
        if(resp.status == 200) return resp.data; return;
      }).catch(function(err){
        $rootScope.$broadcast('error:'+err);
        return;
      });
    },
    remove: function(provider){
      return Resource.delete('identities', provider).then(function(resp){
        return resp.data
      }).catch(function(err){
        $rootScope.$broadcast('error:'+err);
        return;
      })
    }
  }
});
