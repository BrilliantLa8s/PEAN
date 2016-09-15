app.controller('PostsCtrl', function($scope, Resource) {
  Resource.query('posts').then(function(posts){
    $scope.posts = posts;
  })
})
