module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    url: req.url,
    query: req.query,
    headers: req.headers,
    method: req.method
  }, null, 2));
};
