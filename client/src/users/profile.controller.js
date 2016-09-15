app.controller('ProfileCtrl', function($scope, $rootScope, $http, $window, Resource) {
  // Get current user's associations
  Resource.get('users', 'profile')
  .then(function(user){
    $scope.user = user;
  }).catch(function(err){})
})
