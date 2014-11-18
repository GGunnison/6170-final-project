var StudentProfileCreationController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {
    questionsIndex: 0, 
    questions: [
      {
        name: "Question 1 name", 
        question: "Question 1 text goes here"
      }, 
      {
        name: "Question 2 name", 
        question: "Question 2 text goes here"
      }, 
      {
        name: "Question 3 name", 
        question: "Question 3 text goes here"
      }, 
    ]
  };

  var setLocal = function() {

  }

  var setView = function() {
    $("#questionTitle").text(local.questions[local.questionsIndex].name);
    $("#question").text(local.questions[local.questionsIndex].question);
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

    // setView();
    eventListeners();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $("#submitSkillsBtn").on("click", function() {
      $("#skillsForm")[0].submit();
      $("#classesForm")[0].submit();
    });

    $("#allSkillsForm").on("submit", function(e) {
      e.preventDefault();

      var studentId = $(this)[0].elements["studentId"][0].value;
      var skillsInputArray = $(this)[0].elements["skills[]"]
      var skills = [];
      for (var i = 0; i < skillsInputArray.length; i++) {
        if (skillsInputArray[i].checked) {
          var skill_id = skillsInputArray[i].value;
          skills.push(skill_id);
        }
      }
      var data = {
        skills: skills
      }

      console.log("data: ", data);

      $.ajax({
        datatype: "json", 
        type: "POST", 
        url: "/students/" + studentId + "/skills", 
        data: data
      });

      var classesInputArray = $(this)[0].elements["classes[]"];
      var classes = [];
      for (var i = 0; i < classesInputArray.length; i++) {
        if (classesInputArray[i].checked) {
          var class_id = classesInputArray[i].value;
          classes.push(class_id);
        }
      }
      var data = {
        classes: classes
      }

      console.log("data: ", data);

      $.ajax({
        datatype: "json", 
        type: "POST", 
        url: "/students/" + studentId + "/classes", 
        data: data
      });
    })

  }

  return {
    public: public,
    init: init
  }
}
