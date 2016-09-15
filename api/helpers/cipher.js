var config = require('../../config/app');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var ciph, cryp, deci

module.exports = {
  encrypt(val){
    ciph = crypto.createCipher(algorithm, config.secret)
    cryp = ciph.update(val.toString(),'utf8','hex')
    cryp += ciph.final('hex');
    return cryp;
  },
  decrypt(val){
    ciph = crypto.createDecipher(algorithm, config.secret)
    deci = ciph.update(val,'hex','utf8')
    deci += ciph.final('utf8');
    return deci;
  }
}
