const utils = require('./utils')

const {TOKEN_SECRET} = require('../variable')

const TokenCheckMiddleware = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      const decoded = await utils.verifyJwtToken(token, TOKEN_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}  

module.exports = TokenCheckMiddleware