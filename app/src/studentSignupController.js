// author: Sabrina Drammis
var StudentSignupController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();
  }

  var eventListeners = function() {
    $('#submit').on('click', function() {

      var data = { name: $('#firstName').val() + " " + $('#lastName').val(),
                   email: $('#email').val(),
                   password: $('#pass').val(),
                   passwordConfirm: $('#passConfirm').val(),
                   type: 'Student'
                 };
      $.ajax({
        type: "POST",
        url: '/signup',
        data: data
      }).done( function (data) {
        console.log(data);
      });
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = StudentSignupController;
