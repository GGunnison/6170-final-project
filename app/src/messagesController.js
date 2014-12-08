// author: Grant Gunnison
var MessagesController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.inboxTemplate = require('../../views/templates/mail/inbox.jade');
    local.sentTemplate = require('../../views/templates/mail/sent.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};


    exports.renderInbox = function(data) {
      console.log('render');
      var inboxHTML = local.inboxTemplate({messages : data});
        $('#right_side').html(inboxHTML);
      }

    exports.renderSent = function(data) {
      var sentHTML = local.sentTemplate( {messages : data});
        $('#right_side').html(sentHTML);
      }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    //Initialize to have the inbox up to start
    $('#inbox').click();

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#inbox').on('click', function() {
      $.ajax({
        type: "GET",
        url: '/messages/inbox',
        success: function (data) {
          $('#inbox').addClass('selected');
          $('#sent').removeClass('selected');
          $('#create').removeClass('selected');

          helpers.renderInbox(data);
        }
      });
    });

    $('#sent').on('click', function() {
      $.ajax({
        type: "GET",
        url: '/messages/sentbox',
        success: function(data) {
          $('#inbox').removeClass('selected');
          $('#sent').addClass('selected');
          $('#create').removeClass('selected');
          helpers.renderSent(data);
        }
      });
    });

    $(document).on('click', '#delete', function(e) {
      e.stopPropagation();
      var id = $(this).parent().parent().parent().find('#id').text();
      $.ajax({
        type: "DELETE",
        url: '/messages/' + id,
        success: function(){
          if($('#sent').hasClass('selected')){
            $('#sent').click();
          } else {
            $('#inbox').click();
          }
        }
      });
    });


    $(document).on('click', '.panel-body', function() {
        $(this).children('.rest').slideToggle();
      });
  }


  return {
    public: public,
    init: init
  }
}


var MessagesController = new MessagesController();
$(document).ready(function() {
  MessagesController.init();
});

