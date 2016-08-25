app.controller('ProfileCtrl', function($scope, $rootScope, $http, $window, Resource) {
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
    $http.post('/api/auth/authorize', {provider:provider})
    .then(function(resp){
      $window.location.href = resp.data
    }).catch(function(err){console.log(err)});
  }
  // Remove identity
  $scope.removeIdentity = function(provider, idx){
    Resource.delete('identities', provider)
    .then(function(resp){
      console.log(resp)
      // remove identity from array
      $scope.user.Identities.splice(idx, 1)
      // remove provider from connected array
      idx = $scope.connected.indexOf(provider)
      $scope.connected.splice(idx, 1)
    }).catch(function(err){console.log(err)});
  }
})
