// author: Sabrina Drammis
var MessageCreationController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.messageModalTemplate = require('../../views/templates/mail/messageModal.jade');
    local.toName = null;
    local.toId   = null;
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

      local.toName = $(this).attr('name');
      local.toId   = $(this).attr('id');

      $('.modal-title').text('To:  ' + $(this).attr('name'));
      //$('.content').fadeToggle();
    });

    $(document).on('click', '#sendMessage', function () {
      if (local.toName === null && local.toId === null) return false;

      var toName  = local.toName;
      var toId    = local.toId;
      var title   = $('#messageTitle').val();
      var content = $('#messageContent').val();

      console.log(toName);
      console.log(toId);

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
