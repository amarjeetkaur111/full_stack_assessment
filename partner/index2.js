const crypto = require('crypto');
const fs = require('fs');

// Generate an RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // RSA key size
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem' // PEM format for the public key
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem' // PEM format for the private key
    }
});

// Save the public key to a file
fs.writeFileSync('./public.pem', publicKey);

// Save the private key to a file
fs.writeFileSync('./private.pem', privateKey);

console.log('RSA key pair generated and saved.');