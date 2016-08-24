app.controller('ProfileCtrl', function($scope, $rootScope, $http, $window, Resource) {
  // Get current user's associations
  Resource.get('users', 'profile')
  .then(function(user){
    $scope.user = user;
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
      $scope.user.Identities.splice(idx, 1)
    }).catch(function(err){console.log(err)});
  }
})
