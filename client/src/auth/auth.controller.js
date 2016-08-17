app.controller('AuthCtrl', function($state, $scope, $localStorage, Auth) {
  $scope.authenticate = function(creds) {
    Auth.authenticate(creds).then(function(resp){
      if(resp.status == 200){
        $state.go('main');
      } else {$scope.error = resp.data}
    }).catch(function(err){
      console.log(err)
    });
  };
});
