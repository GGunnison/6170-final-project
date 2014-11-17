var IndexController = function() {
  
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

  }

  return {
    public: public, 
    init: init
  }
}