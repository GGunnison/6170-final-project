module.exports = function () {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.featuredUserHTML = require('../../views/templates/userInfo.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.clearNavSelect = function () {
      $('.listed-student').removeClass('active');
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $(".listed-student").click(function() {
      helpers.clearNavSelect();
      console.log(this);
      $(this).addClass('active');
    });
  }

  return {
    public: public,
    init: init
  }

}
