const crypto = require('crypto');

const isArrayNullOrEmpty = (array) =>{
    if (Array.isArray(array) && array.length) {
        return false;
    }
    return true;
}

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
  }

module.exports = {
    isArrayNullOrEmpty,
    hashPassword
}