app.controller('AuthCtrl', function($state, $scope, $localStorage, Auth) {
  // Authenticate then set currentUser in locastorage
  $scope.authenticate = function(creds){
    // Then authenticate
    Auth.authenticate(creds).then(function(resp){
      if(resp.status == 200){
        Auth.current().then(function(user){
          $localStorage.currentUser = user;
          $state.go('main');
        });
      } else {$scope.error = resp.data}
    }).catch(function(err){
      console.log(err)
    });
  };
});
