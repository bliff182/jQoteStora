$(document).ready(function () {

   // AJAX CALL TO DYNAMICALLY GENERATE BURGERS FROM API
   $.ajax('/api/burgers', {
      type: 'GET'
   }).then(function (data) {
      var uneatenElem = $('#uneaten');
      var devouredElem = $('#devoured');
      var burgers = data.burgers;
      var len = burgers.length;
      // console.log(burgers);

      for (var i = 0; i < len; i++) {
         var burgerBtn =
            `<li><img src='assets/img/animated-clipart-burger-5.jpg' class='burgerIcon'/>  ${burgers[i].burger_name}  <button type='button' class='btn btn-dark devour' data-id='${burgers[i].id}'data-devoured='${burgers[i].devoured}'>Devour</button></li>`;

         var deleteBtn =
            `<li><img src='assets/img/animated-clipart-burger-5.jpg' class='burgerIcon'/>  ${burgers[i].burger_name}  <button type='button' class='btn btn-danger deleteBtn' data-id='${burgers[i].id}' data-devoured='${burgers[i].devoured}'>Delete</button</li>`;

         if (burgers[i].devoured) {
            devouredElem.append(deleteBtn);
         } else {
            uneatenElem.append(burgerBtn);
         }
      }
   });

   // DEVOUR BUTTON
   $(document).on("click", ".devour", function (event) {
      event.preventDefault();

      var burger_id = $(this).data("id");

      var isDevoured = $(this).data('devoured') === true;
      console.log(burger_id)
      console.log(isDevoured);
      var newDevoured = {
         devoured: isDevoured
      };
      $.ajax(`/api/burgers/${burger_id}`, {
         type: 'PUT',
         data: JSON.stringify(newDevoured),
         dataType: 'json',
         contentType: 'application/json'
      }).then(function () {
         console.log('changed devoured status to', isDevoured);
         location.reload();
      });
   });

   // CREATE NEW BURGER
   $('#burger-submit').on('click', function (event) {
      event.preventDefault();
      var newBurger = {
         burger_name: $('#burgerInput').val().trim(),
         devoured: false
      };
      $.ajax('/api/burgers', {
         type: 'POST',
         data: JSON.stringify(newBurger),
         dataType: 'json',
         contentType: 'application/json'
      }).then(function () {
         console.log('created new burger');
         location.reload();
      });
      // console.log(newBurger);
   });

   // DELETE BUTTON
   $(document).on("click", ".deleteBtn", function (event) {
      event.preventDefault();
      var burger_id = $(this).data("id");
      // console.log(burger_id);

      // SEND DELETE REQUEST
      $.ajax(`/api/burgers/${burger_id}`, {
         type: 'DELETE'
      }).then(function () {
         console.log('deleted burger', burger_id);
         location.reload();
      });
   });
});