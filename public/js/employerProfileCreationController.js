/*
 * Author: Daniel Sanchez
 */
employMeApp.controller("employerProfileCreationController", function($scope) {

  // Public variables, available outside controller
  var public = $scope.viewModel = {
    jobSkills: {}
  };

  // Private variables,
  var local = {};

  // Occurs after document.ready
  var setLocal = function() {
    local.employerId = $("#employerId")[0].value;
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports;
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    select2Init();

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();
  }

  var select2Init = function() {
    $("#skillSelect").select2();
  }

  var sizingJS = function() {}

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $("#addSkillBtn").on("click", function() {
      var skill_id = $("#skillSelect")[0].options[$("#skillSelect")[0].selectedIndex].value;
      var skill_name = $("#skillSelect")[0].options[$("#skillSelect")[0].selectedIndex].text;

      public.jobSkills[skill_id] = skill_name;
      console.log("skills: ", public.jobSkills);
      $scope.$apply();
    });

    $("#listingForm").on("submit", function() {

      console.log($(this)[0].elements)

      var skills = [];

      for (skill in public.jobSkills) {
        var skillObj = {};
        skillObj[skill] = public.jobSkills[skill];
        skills.push(skillObj);
      }

      var data = {
        listing: {
          title: $(this)[0].elements["title"].value, 
          description: $(this)[0].elements["description"].value, 
          position: $(this)[0].elements["position"].value, 
          location: $(this)[0].elements["location"].value, 
          skills: skills
        }
      };

      $.ajax({
        datatype: "json", 
        type: "POST", 
        url: "/employers/" + local.employerId + "/listings", 
        data: data
      }).done(function(res) {
        window.location = "/search";
      });
    });
  }

  init();
});