// author: Grant Gunnison
var MessagesController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.inboxTemplate = require('../../views/templates/mail/inbox.jade');
    local.createTemplate = require('../../views/templates/mail/create.jade');
    local.sentTemplate = require('../../views/templates/mail/sent.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};


    exports.renderInbox = function(data) {
      var inboxHTML = local.inboxTemplate({messages : data});
      $('#right_side').html(inboxHTML);
    }

    exports.renderCreate = function() {
      var createHTML = local.createTemplate();
      $('#right_side').html(createHTML);
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
    helpers.renderInbox();

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#inbox').on('click', function() {
      $.ajax({
        type: "GET",
        url: '/messages/inbox',
        success: function (data) {
          helpers.renderInbox(data);
        }
      });
    });

    $('#sent').on('click', function() {
      $.ajax({
        type: "GET",
        url: '/messages/sentbox',
        success: function(data) {
          helpers.renderSent(data);
        }
      });
    });

    $('create').on('click', function() {
      helpers.renderCreate();
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

