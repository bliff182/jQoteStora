var path = require('path');

module.exports = function(app) {
   app.get('/', function(req, res) {
      res.sendFile(path.joing(__dirname, '../public/index.html'));
   });
};