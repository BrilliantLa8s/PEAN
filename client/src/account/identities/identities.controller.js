// Account identities controller
app.controller('IdentitiesCtrl', function($scope, $window, Resource, Identity){
  // Get current user's associations
  Resource.get('users', 'profile')
  .then(function(user){
    $scope.user = user;
    // make array of connected identity providers
    $scope.connected = user.Identities
    .map(function(id){return id.provider});
  }).catch(function(err){})

  // Connect/add provider identity
  $scope.addIdentity = function(provider){
    Identity.connect(provider).then(function(url){
      $window.location.href = url
    });
  }
  // Remove identity
  $scope.removeIdentity = function(provider, idx){
    Identity.remove(provider).then(function(resp){
      $scope.user.Identities.splice(idx, 1)
      idx = $scope.connected.indexOf(provider)
      $scope.connected.splice(idx, 1)
    });
  }
})
