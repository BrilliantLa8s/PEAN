app.config(function($locationProvider, $stateProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true).hashPrefix('!');
  $stateProvider
  .state('main', {
    url:'/',
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  })
  .state('posts', {
    url:'/posts',
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  })
  .state('users', {
    url:'/users',
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl'
  })
  .state('account', {
    url:'/account',
    templateUrl: 'users/account.html',
    controller: 'AccountCtrl'
  })
  .state('register', {
    url:'/register',
    templateUrl: 'auth/register.html'
  })
  .state('login', {
    url:'/login',
    templateUrl: 'auth/login.html'
  })
  .state('logout', {
    url:'/logout',
    templateProvider: function(Auth, $state){
      Auth.logout().then(function(){
        $state.reload();
      }).catch(function(err){console.log(err)})
    }
  });

  // catchall route
  $urlRouterProvider.otherwise('/');
});
