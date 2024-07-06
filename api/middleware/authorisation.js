const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

// Middleware d'autorisation
const authenticateUser = (req, res, next) => {
  
  try {

    const cookie = req.cookies.auth;
    const authData = JSON.parse(cookie);
    const decoded = jwt.verify(authData.token, config.privateKey);

    if (!decoded.isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  } catch (err) {

    return res.status(402).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
