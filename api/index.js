const handler = require('./[...path].js');

module.exports = (req, res) => {
  return handler(req, res);
};
