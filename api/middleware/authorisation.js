const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

// Middleware d'autorisation
const authenticateUser = (req, res, next) => {
  
  try {
    console.log(1)
    const cookie = req.cookies.auth;
    console.log('string cookie', cookie)
    const authData = JSON.parse(cookie);
    console.log('authdata', authData)

    console.log(2)
    console.log('json token ',authData.token )
    const decoded = jwt.verify(authData.token, config.privateKey);
    console.log(3)

    console.log(decoded);

    if (!decoded.isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  } catch (err) {

    return res.status(402).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
