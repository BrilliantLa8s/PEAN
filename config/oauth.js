// Oauth providers
module.exports = {
  instagram: {
    authUrl: 'https://api.instagram.com/oauth/authorize/?',
    accessUrl: 'https://api.instagram.com/oauth/access_token?',
    grantType: 'authorization_code',
    endpoint: 'https://api.instagram.com/v1/users/self/media/recent/?',
    responseType: 'code',
    scope: 'basic'
  },
  facebook: {
    authUrl: 'https://www.facebook.com/dialog/oauth?',
    accessUrl: 'https://graph.facebook.com/v2.7/oauth/access_token?',
    grantType: 'authorization_code',
    responseType: 'code',
    scope: 'public_profile',
    data: {
      url: 'https://graph.facebook.com/me'
    }
  }
}
