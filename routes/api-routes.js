const db = require('../models');

// Routes
module.exports = function (app) {
   // GET route for getting all of the burgers
   app.get('/api/burgers', function (req, res) {
      // findAll returns all entries for a table when used with no options
      db.Burger.findAll({}).then(function (dbBurger) {
         // We have access to the burgers as an argument inside of the callback function
         res.json(dbBurger);
      });
   });

   // POST route for saving a new burger
   app.post('/api/burgers', function (req, res) {
      db.Burger.create({
         burger_name: req.body.burger_name,
         devoured: req.body.devoured
      }).then(function (dbBurger) {
         // We have access to the new burger as an argument inside of the callback function
         res.json(dbBurger);
      }).catch(function (err) {
         console.log(err);
         res.json(err);
      });
   });

   // DELETE route for deleting burgers. We can get the id of the burger to be deleted from req.params.id
   app.delete('/api/burgers/:id', function (req, res) {
      // We just have to specify which todo we want to destroy with "where"
      db.Burger.destroy({
         where: {
            id: req.params.id
         }
      }).then(function (dbBurger) {
         console.log(err);
         res.json(dbBurger);
      });
   });

   // PUT route for updating burgers. We can get the updated burger data from req.body
   app.put('/api/burgers', function (req, res) {
      // Update takes in an object describing the properties we want to update, and
      // we use where to describe which objects we want to update
      db.Burgers.update({
         burger_name: req.body.burger_name,
         complete: req.body.complete
      }, {
         where: {
            id: req.body.id
         }
      }).then(function(dbBurger) {
         res.json(dbBurger);
      }).catch(function(err) {
         console.log(err);
         res.json(err);
      });
   });
};