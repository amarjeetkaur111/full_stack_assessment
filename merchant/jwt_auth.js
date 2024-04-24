const jwt = require('jsonwebtoken');
const fs = require('fs');

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./private.pem', 'utf8');

/*
 ====================   JWT Signing =====================
*/

// SIGNING OPTIONS
const payloadOptions = {
  nbf: Math.floor(Date.now() / 1000), // Not before time (current time)
  iat: Math.floor(Date.now() / 1000), // Issued at time (current time)
  jti: 'unique_token_id', // JWT ID
  msisdn: '+1234567890',
}
const signInOptions = {
    issuer:  'InnovationFactory',
    subject:  'JWT Authentication',
    audience:  'fullstackassignment',
    expiresIn:  "12h",    
    algorithm: 'RS256'
};


//payload is signInOptions

const createToken = (payload) => {
    console.log('Payload'+payload);
    return jwt.sign(payload,privateKEY,signInOptions);
}



// const verifyToken = (_id) => {
//     return jwt.verify({_id},publicKEY,verifyOptions);
// }


module.exports = {payloadOptions, createToken};