app.controller('PostsCtrl', function($scope, Post) {
  // Get all posts
  Post.query().then(function(resp){
    if(resp.status === 200){$scope.posts = resp.data};
  })
})
