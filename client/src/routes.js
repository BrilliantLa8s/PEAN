app.config(function($locationProvider, $stateProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true).hashPrefix('!');
  $stateProvider
  .state('main', {
    url:'/',
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  })
  .state('admin', {
    url:'/admin',
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  })
  .state('posts', {
    url:'/posts',
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  })
  .state('profile', {
    url:'/profile',
    templateUrl: 'users/profile.html',
    controller: 'ProfileCtrl'
  })
  .state('account', {
    url:'/account',
    templateUrl: 'account/index.html',
    controller: 'AccountCtrl'
  })
  .state('account.update', {
    url:'/update',
    templateUrl: 'account/update.html',
    controller: 'AccountCtrl'
  })
  .state('account.identities', {
    url:'/identities',
    templateUrl: 'account/identities.html',
    controller: 'IdentitiesCtrl'
  })
  .state('account.settings', {
    url:'/settings',
    templateUrl: 'account/settings.html',
    controller: 'AccountCtrl'
  })
  .state('account.support', {
    url:'/support',
    templateUrl: 'account/support.html',
    controller: 'AccountCtrl'
  })
  .state('identity', {
    url:'/identity/:id',
    templateProvider: function($http, $state, $stateParams){
      $http.post('/api/identities/finish',
      {id:$stateParams.id}).then(function(resp){
        $state.go('account.identities');
      }).catch(function(err){console.log(err)})
    }
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
