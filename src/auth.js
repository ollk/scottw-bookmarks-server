const logger = require('./logger');

module.exports = function validateBearerToken (req, res, next) {
  console.log('test');

  const apiToken = process.env.API_TOKEN;

  console.log('apiToken', apiToken);

  const authToken = req.get('Authorization');

  console.log('authToken', authToken);

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res
      .status(401)
      .json({ error: 'Unauthorized request'});
  };

  next();
};