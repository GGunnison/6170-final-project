// author: Sabrina Drammis
var LoginController = function() {

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

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#submit').on('click', function() {

      var data = { email: $('#email').val(),
                   password: $('#pass').val()
                 };
      $.ajax({
        type: "POST",
        url: '/login',
        data: data
      }).done( function (data) {
        if (data.alertMessage) {
          $('#alertMessage').text(data.alertMessage);
          $('.alert').fadeIn(800);
        } else {
          window.location = '/search';
        }
      });
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = LoginController;
