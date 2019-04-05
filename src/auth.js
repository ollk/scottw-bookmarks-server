const logger = require('./logger');

module.exports = function validateBearerToken (req, res, next) {
  logger.error('test');

  const apiToken = process.env.API_TOKEN;

  console.error('apiToken', apiToken);

  const authToken = req.get('Authoriz');

  console.log('authToken', authToken);

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res
      .status(401)
      .json({ error: 'Unauthorized request'});
  };

  next();
};