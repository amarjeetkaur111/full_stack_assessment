const jwt = require('jsonwebtoken');
const fs = require('fs');

// PRIVATE and PUBLIC key
var publicKEY  = fs.readFileSync('./public.pem', 'utf8');

/*
====================   JWT Verify =====================
*/

function authenticateToken(req, res, next) {

    const requiredPayloadClaims = ['nbf', 'iat', 'jti', 'msisdn','subscriptionId','action'];
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const verifyOptions = {
      issuer:  'InnovationFactory',
      subject:  'JWT Authentication',
      audience:  'fullstackassignment',
      expiresIn:  "12h",    
      algorithm: ['RS256'] // RS256 algorithm
    };

    console.log('Inside Authen:token '+token, 'header: '+authHeader);

    const error = new Error();

    if (!token) {
        console.error('No token provided');
        error.status = 401;
        return next(error);
    }  
    jwt.verify(token, publicKEY, verifyOptions, (err, decoded) => {
        if (err) {
            // Token verification failed
            console.error('Invalid token:', err.message);
            error.status = 401;
            return next(error);       
          } else {
            // Token verification successful
            console.log('Decoded payload:', decoded);
            // Check if all required payload claims are present
            const missingClaims = requiredPayloadClaims.filter(claim => !(claim in decoded));
            if (missingClaims.length > 0) {
                error.status = 401;
                return next(error);  
                // res.status(403).json({ message: `Missing required payload claims: ${missingClaims.join(', ')}` }); 
            } else {
                console.log('All required payload claims are present');
                // Additional checks for specific claims
                const now = Math.floor(Date.now() / 1000); // Current UNIX timestamp
                if (decoded.nbf && decoded.nbf > now) 
                    {
                      error.status = 401;
                      return next(error);  
                      // res.status(403).json({ message: 'Token not yet valid (nbf claim)' });  
                    }               
                if (decoded.iat && decoded.iat > now) 
                  {
                    error.status = 401;
                    return next(error);  
                    // res.status(403).json({ message:'Token issued in the future (iat claim)' });   
                  }
                // Additional checks for other claims (jti, msisdn, etc.)
            }
        }
      next();
    });
  }

  

// const verifyToken = (_id) => {
//     return jwt.verify({_id},publicKEY,verifyOptions);
// }


module.exports = { authenticateToken };