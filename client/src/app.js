angular.module('app', ['ui.router', 'ngMaterial', 'ngStorage']);

var app = angular.module('app');

app.run(function($rootScope, Auth){
  $rootScope.providers = ['instagram', 'facebook']
  $rootScope.$on('$stateChangeStart',function(){
    // check for current user
    Auth.current().then(function(user){
      $rootScope.currentUser = user;
    }).catch(function(err){
      $rootScope.currentUser = {};
    });
  });
  $rootScope.$on('loading:start', function (){
    $rootScope.isLoading = true;
  });
  $rootScope.$on('loading:finish', function (){
    $rootScope.isLoading = false;
  });
});
