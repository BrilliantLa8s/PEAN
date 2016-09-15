app.controller('AdminCtrl', function($scope, Resource){
  Resource.query('users').then(function(users){
    $scope.users = users;
  });
})
