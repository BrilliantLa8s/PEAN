app.factory('Post', function($http){
  return {
    query: function(){
      return $http.get('/api/posts')
      .then(function(resp){
        return resp;
      }).catch(function(err){
        return err;
      });
    },
    get: function(id){
      return $http.get('api/posts/'+id)
      .then(function(resp){
        return resp
      }).catch(function(err){
        return err;
      });
    }
  }
});
