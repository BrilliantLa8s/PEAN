var locale = process.env.LOCALE || 'en';

module.exports = {
  en:{
    auth:{
      unable: 'Unable to process your request',
      reg:{
        taken: 'This email address is already registered',
        mismatch: 'Passwords do not match',
        invalid: 'Enter a valid email and password'
      },
      log:{
        wrong: 'Wrong credentials. Try again',
        token: 'missing token',
        notfound: 'This email address is not registered'
      }
    }
  }
}[locale]
