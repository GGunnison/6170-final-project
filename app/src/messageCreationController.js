// author: Sabrina Drammis
var MessageCreationController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.messageModalTemplate = require('../../views/templates/mail/messageModal.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.toggleModal = function () {
      $('.modal').modal('toggle');
      // set the modal information
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    eventListeners();

    var modalHTML = local.messageModalTemplate();
    $('body').append(modalHTML);
  }

  var eventListeners = function() {
    $(document).on('click', '.createMessageBtn', function () {
      helpers.toggleModal();

      $('.modal-title').text('To:  ' + $(this).attr('name'));
      //$('.content').fadeToggle();
    });

    $(document).on('click', '#sendMessage', function () {
      var toName  = $('.createMessageBtn').attr('name');
      var toId    = $('.createMessageBtn').attr('id');
      var title   = $('#messageTitle').val();
      var content = $('#messageContent').val();

      $.ajax({
        type: "POST",
        url: "/messages/" + toId,
        data: { to      : toName,
                content : content, 
                title   : title
        },
        success: function(data) {
          console.log("success");
          $('.modal').modal('toggle');          
        }
      })
    });
  }

  return {
    public: public,
    init: init
  }
}

var messageCreationController = new MessageCreationController();
$(document).ready(function() {
  messageCreationController.init();
});
