app.controller('NavbarCtrl', function($scope) {
  $scope.main = [
    {
      link: 'Home',
      state: 'main',
      icon: ''
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
