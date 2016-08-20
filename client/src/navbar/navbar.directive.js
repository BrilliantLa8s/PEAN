app.controller('NavbarCtrl', function($scope) {
  $scope.mainmenu = [
    {
      link: 'Home',
      state: 'main',
      icon: ''
    },
    {
      link: 'Posts',
      state: 'posts',
      icon: ''
    }
  ];
  // Authmenu
  $scope.authmenu = [
    {
      link: 'Profile',
      state: 'profile',
      icon: 'assignment_ind'
    },
    {
      link: 'Account',
      state: 'account',
      icon: 'settings'
    },
    {
      link: 'Logout',
      state: 'logout',
      icon: 'person'
    }
  ];
}).directive('navbar', function() {
  var directive;
  return directive = {
    restrict: 'E',
    templateUrl: 'navbar/navbar.html',
    controller: 'NavbarCtrl',
    bindToController: false,
    scope: true
  };
});
