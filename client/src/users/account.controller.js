app.controller('AccountCtrl', function($scope, $rootScope) {
  $scope.update = function(user){
    Resource.save('users', user.id)
  }
})
