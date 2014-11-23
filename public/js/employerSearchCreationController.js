var EmployerSearchCreationController = function() {

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
        desiredSkills: desiredSkills
      }

      console.log(data);

      $.ajax({
        datatype: "json", 
        type: "POST", 
        url: "/students/search", 
        data: data
      }).done(function(res) {
        $("body").html(res);
      });
    });
  }

  return {
    public: public,
    init: init
  }
}
