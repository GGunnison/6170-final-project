var SearchResultsController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {

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
      console.log('clicky');
    });

  }

  return {
    public: public,
    init: init
  }

}
