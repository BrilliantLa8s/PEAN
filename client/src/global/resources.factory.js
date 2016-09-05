app.factory('Resource', function($http) {
  return {
    query: function(path){
      return $http.get('/api/'+path)
      .then(function(resp){
        if(resp.status == 200) return resp.data; return;
      }).catch(function(err){
        return err;
      })
    },
    get: function(path, param){
      return $http.get('/api/'+path+'/'+param)
      .then(function(resp){
        if(resp.status == 200) return resp.data; return;
      }).catch(function(err){
        return err
      });
    },
    save: function(path, param, body){
      return $http.put('/api/'+path+'/'+param, body)
      .then(function(resp){
        return resp;
      }).catch(function(err){
        return err;
      });
    },
    delete: function(path, param){
      return $http.delete('/api/'+path+'/'+param)
      .then(function(resp){
        if(resp.status == 200) return resp.data; return;
      }).catch(function(err){
        return err
      });
    }
  }
});
