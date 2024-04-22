const jwt = require('jsonwebtoken');
const fs = require('fs');

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');

/*
 ====================   JWT Signing =====================
*/


// // PAYLOAD
// var payload = {
//     data1: "Data 1",
//     data2: "Data 2",
//     data3: "Data 3",
//     data4: "Data 4",
//    };

var iss  = 'InnovationFactory';          // Issuer 
var sub  = 'JWT Authentication';        // Subject 
var aud  = 'fullstackassignment'; // Audience
// SIGNING OPTIONS
var signOptions = {
    issuer:  iss,
    subject:  sub,
    audience:  aud,
    expiresIn:  "12h",
    algorithm:  "RS256"
};

const createToken = (_id) => {
    return jwt.sign({_id},privateKEY,signOptions);
    // return jwt.sign(payload,privateKEY,signOptions);
}

/*
====================   JWT Verify =====================
*/
var verifyOptions = {
    issuer:  iss,
    subject:  sub,
    audience:  aud,
    expiresIn:  "12h",
    algorithm:  "RS256"
};

const verifyToken = (_id) => {
    return jwt.verify({_id},publicKEY,verifyOptions);
}


module.exports = { createToken,verifyToken };