app.controller('AuthCtrl', function($state, $scope, $localStorage, Auth) {
  $scope.authenticate = function(creds) {
    Auth.authenticate(creds).then(function(resp){
      $state.go('main')
    }).catch(function(err){
      console.log(err)
    });
  };
});
