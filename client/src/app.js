angular.module('app', ['ui.router', 'ngMaterial', 'ngStorage']);

var app = angular.module('app');

app.run(function($rootScope, Auth){
   $rootScope.$on('$stateChangeStart',function(){
     // check for current user
     Auth.current().then(function(user){
       if(user.status === 200){
         $rootScope.currentUser = user.data
       } else {console.log(user.data.message)};
     }).catch(function(err){
       $rootScope.currentUser = false
     });
   });
});
