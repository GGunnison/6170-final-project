// Author: Daniel Sanchez

employMeApp.controller("profileController", function($scope) {

  // Public variables, available outside controller
  var public = $scope.viewModel = {};

  var setViewModel = function() {

    var counter = 0;
    var setSkills = function() {
      ajax.getSkills().done(function(res) {
        local.skills = res.content;
        setSkillMap();
        $scope.$apply();
      }).fail(function() {
        if (counter <= 10) {
          console.log("trying to get skills again...");
          setSkills();
          counter++;
        }
      });
    }
    setSkills();

    var setSkillMap = function() {
      public.skillsMap = {};
      for (var i = 0; i < local.skills.length; i++) {
        var skillObj = local.skills[i];
        public.skillsMap[skillObj._id] = skillObj.name;
      }

      console.log("skillsMap: ", public.skillsMap);
    }

  }

  // Private variables,
  var local = {};

  var setLocal = function() {}

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports
  })();

  var ajax = (function() {
    var exports = {};

    exports.getSkills = function() {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/skills"
      });
    }

    return exports;
  })();

  // Starts all processes
  var init = function() {
    setViewModel();
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

  var eventListeners = function() {}

  init();

});
