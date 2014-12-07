// Author: Daniel Sanchez

employMeApp.controller("searchCreationController", function($scope) {
  // Public variables, available outside controller
  var public = $scope.viewModel = {
    skills: [],
    csrf: $("#csrf")[0].value
  };

  var setViewModel = function() {

    var counter = 0;
    var setSkills = function() {
      ajax.getSkills().done(function(res) {
        public.skills = res.content;
        $scope.$apply();
        setSkillMap();
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
      for (var i = 0; i < public.skills.length; i++) {
        var skillObj = public.skills[i];
        public.skillsMap[skillObj._id] = skillObj.name;
      }
    }
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

    eventListeners.init();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = (function() {
    var exports = {};

    exports.init = function () {
      exports.dragAndDropInit();

      $('.rightColCont').delegate('.searchResult', 'click', function() {
        $(this).html('p changed html');
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

        var ajaxObj = {
          datatype: "json",
          type: "GET",
          data: data
        }

        if ($(this).attr("data-type") == "Student") {
          ajaxObj["url"] = "/employers";
        } else if ($(this).attr("data-type") == "Employer") {
          ajaxObj["url"] = "/students";
        }

        $.ajax(ajaxObj).done(function(res) {
          public.searchResults = res.content;
          $scope.$apply();
        });
      });
    }

    exports.dragAndDropInit = function () {
      var xHtml = "  &#10006;";
      $("#skillsCont").delegate(".draggable", "mouseenter", function(e) {
        $(this).draggable({
          appendTo: "body",
          helper: "clone",
          revert: 'invalid'
        });
      });

      $(".skillsDrop").droppable({
        drop: function(e, ui) {
          var skillName = ui.draggable.text();
          var skillId = ui.draggable.attr("id");
          $("#" + skillId).remove();

          $("<div class='skill draggedSkill'><span id=" + skillId + " class='label label-default'>" + ui.draggable.text() + xHtml + "</span></div>")
            .appendTo(this);
        }
      });

      $(".skillsDrop").on("click", ".skill", function(e) {
        var skillId = $(this).children().attr("id");
        var skillText = $(this).text().substring(0, $(this).text().length - (xHtml.length - 7));
        console.log("skillText", skillText);
        var skillHtml = $("<div class='skill'><span id=" + skillId + " class='draggable label label-default'>" + skillText + "</span></div>")

        $(this).remove();
        $("#skillsCont").prepend(skillHtml);

        $("#" + skillId).draggable({
          appendTo: "body",
          helper: "clone",
          revert: "invalid"
        });
      });


    }

    return exports;
  })();

  init();
});
