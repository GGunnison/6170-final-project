// Author: Daniel Sanchez

employMeApp.controller("searchCreationController", function($scope) {
  // Public variables, available outside controller
  var public = $scope.viewModel = {
    skills: [], 
    csrf: $("#csrf")[0].value;
  };

  var setViewModel = function() {

    var counter = 0;
    var setSkills = function() {
      ajax.getSkills().done(function(res) {
        public.skills = res.content;
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
  }

  // Private variables,
  var local = {};

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

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();
    console.log("csrf: ", public.csrf);
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $(".draggable").draggable({
      appendTo: "body",
      helper: "clone",
      revert: 'invalid'
    });

    $(".skillsDrop").droppable({
      drop: function(e, ui) {
        var skillName = ui.draggable.text();
        var skillId = ui.draggable.attr("id");
        $("#" + skillId).remove();

        $("<span class='skill'><span id=" + skillId + " class='label label-default'>" + ui.draggable.text() + "</span></span>")
          .appendTo(this);
      }
    });

    $(".skillsDrop").on("click", ".skill", function(e) {
      var skillId = $(this).attr("id");
      var skillHtml = $("<div class='skill'><span id=" + skillId + " class='draggable label label-default'>" + $(this).text() + "</span></div>")

      $(this).remove();
      $(".skillsCol").append(skillHtml);

      $("#" + skillId).draggable({
        appendTo: "body",
        helper: "clone",
        revert: "invalid"
      });
    });

    $("#skillSubmit").on("click", function() {
      var requiredSkills = [];
      var desiredSkills = [];

      $(".requiredSkillsDrop .skill span").each(function(i) {
        var skill_id = $(this).attr("id");
        requiredSkills.push(skill_id);
      });

      $(".desiredSkillsDrop .skill span").each(function(i) {
        var skill_id = $(this).attr("id");
        desiredSkills.push(skill_id);
      });

      var data = {
        requiredSkills: requiredSkills,
        desiredSkills: desiredSkills, 
        _csrf: public.csrf
      }

      $.ajax({
        datatype: "json",
        type: "POST",
        url: '/employers',
        data: data
      }).done(function(res) {
        $("body").html(res);
      });
    });
  }

  init();
});
