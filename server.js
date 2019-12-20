const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Routes
require('./routes/api-routes.js')(app);

// app.use(routes);

db.sequelize.sync({ force: true }).then(function() {
   app.listen(PORT, function() {
      console.log('Server listening on http://localhost:' + PORT);
   });
});