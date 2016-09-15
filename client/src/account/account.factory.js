app.factory('Account', function($http){
  return {
    menu: function(){
      return [
        {
          link: 'Edit Info',
          state: 'account.update',
          icon: 'person_pin'
        },
        {
          link: 'Identities',
          state: 'account.identities',
          icon: 'group_add'
        },
        {
          link: 'Settings',
          state: 'account.settings',
          icon: 'build'
        },
        {
          link: 'Support',
          state: 'account.support',
          icon: 'supervisor_account'
        }
      ]
    }
  }
})
