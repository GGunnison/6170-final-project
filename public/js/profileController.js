// Author: Daniel Sanchez

employMeApp.controller("profileController", function($scope) {

  // Public variables, available outside controller
  var public = $scope.viewModel = {};

  var setViewModel = function() {
    public.studentSkills = {};
    public.studentClasses = {};
    public.experiences = [];
    public.skills = [];
    public.klasses = [];

    public.skillsMap = {};
    public.classesMap = {};

    public.savingSummary = false;

    ajax.getAllSkills().done(function(res) {
      public.skills = res.content;
      for (var i = 0; i < res.content.length; i++) {
        var obj = res.content[i];
        public.skillsMap[obj._id] = obj.name;
      }
    });

    ajax.getAllClasses().done(function(res) {
      public.klasses = res.content;
      for (var i = 0; i < res.content.length; i++) {
        var obj = res.content[i];
        public.classesMap[obj._id] = obj.name;
      }
    });

    ajax.getStudentSkills(local.studentId).done(function(res) {
      for (var i = 0; i < res.content.length; i++) {
        public.studentSkills[res.content[i]._id] = res.content[i].name;
      }
      $scope.$apply();
    });

    ajax.getStudentClasses(local.studentId).done(function(res) {
      for (var i = 0; i < res.content.length; i++) {
        public.studentClasses[res.content[i]._id] = res.content[i].name;
      }
      $scope.$apply();
    });

    ajax.getStudentExperiences(local.studentId).done(function(res) {
      public.experiences = res.content;
      $scope.$apply();
    });
  }

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.studentId = $("#studId")[0].value;
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports;
  })();

  var ajax = (function() {
    var exports = {};

    exports.getAllSkills = function() {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/skills"
      });
    }

    exports.getAllClasses = function() {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/classes"
      });
    }

    exports.getStudentSkills = function(studentId) {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/students/" + studentId + "/skills"
      });
    }

    exports.getStudentClasses = function(studentId) {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/students/" + studentId + "/classes"
      });
    }

    exports.putSkills = function(studentId) {

      var skills = [];
      for (id in public.studentSkills) {
        skills.push(id);
      }

      var body = {
        skills: skills
      }

      return $.ajax({
        datatype: "json", 
        type: "PUT", 
        url: "/students/" + studentId + "/skills", 
        data: body
      });
    }

    exports.putClasses = function(studentId) {

      var classes = [];
      for (id in public.studentClasses) {
        classes.push(id);
      }

      var body = {
        classes: classes
      }

      return $.ajax({
        datatype: "json", 
        type: "PUT", 
        url: "/students/" + studentId + "/classes", 
        data: body
      });
    }

    exports.getStudentSummary = function(studentId) {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/students/" + studentId + "/summary"
      });
    }

    exports.putStudentSummary = function(studentId) {
      var summary = $("#summaryInput").val();

      var body = {
        summary: summary
      }

      return $.ajax({
        datatype: "json", 
        type: "PUT", 
        url: "/students/" + studentId + "/summary",
        data: body
      });
    }

    exports.getStudentExperiences = function(studentId) {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/students/" + studentId + "/experience"
      });
    }

    exports.postStudentExperience = function(studentId, experience) {

      var body = {
        experience: experience
      }

      return $.ajax({
        datatype: "json", 
        type: "POST", 
        url: "/students/" + studentId + "/experience", 
        data: body
      });
    }

    exports.putStudentExperience = function(studentId, experienceId, experience) {

      var body = {
        experience: experience
      }

      return $.ajax({
        datatype: "json", 
        type: "PUT", 
        url: "/students/" + studentId + "/experience/" + experienceId, 
        data: body
      });
    }

    exports.deleteStudentExperience = function(studentId, experienceId) {
      return $.ajax({
        datatype: "json", 
        type: "DELETE", 
        url: "/students/" + studentId + "/experience/" + experienceId
      });
    }

    return exports;
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    setViewModel();

    sizingJS();
    $(window).resize(responsiveJS);

    ajax.getStudentSummary(local.studentId).done(function(res) {
      $("#summaryInput").val(res.content);
    });

    eventListeners();
  }

  var sizingJS = function() {}

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $("#skillsCont").delegate(".skill", "click", function() {

      var id = $(this).children().attr("id");
      var name = public.skillsMap[id];

      public.studentSkills[id] = name;
      $scope.$apply();

      ajax.putSkills(local.studentId);
    });

    $(".skillsContainer").delegate(".skill", "click", function() {

      var id = $(this).children().attr("id");
      var name = public.skillsMap[id];

      delete public.studentSkills[id];
      $scope.$apply();

      ajax.putSkills(local.studentId);
    });

    $("#classesCont").delegate(".class", "click", function() {
      var id = $(this).children().attr("id");
      var name = public.classesMap[id];

      console.log(id);
      console.log(name);

      public.studentClasses[id] = name;
      $scope.$apply();

      ajax.putClasses(local.studentId);
    });

    $(".classesContainer").delegate(".class", "click", function() {

      var id = $(this).children().attr("id");
      var name = public.classesMap[id];

      delete public.studentClasses[id];
      $scope.$apply();

      ajax.putClasses(local.studentId);
    });

    (function() {
      var counter = 0;
      $("#summaryInput").on("keyup", function() {
        public.savingSummary = true;
        $scope.$apply();
        if (counter == 0) {
          counter = 1000;
          setTimeout(function() {
            counter = 0;

            ajax.putStudentSummary(local.studentId).done(function() {
              public.savingSummary = false;
              $scope.$apply();
            });
          }, 2000);
        }

      });
    })();

    $("#experienceForm").on("submit", function(e) {

      e.preventDefault();

      var experience = {
        company: $(this)[0].elements["company"].value, 
        position: $(this)[0].elements["position"].value, 
        startTime: "", 
        endTime: "", 
        description: $(this)[0].elements["description"].value
      }

      ajax.postStudentExperience(local.studentId, experience).done(function(res) {
        ajax.getStudentExperiences(local.studentId).done(function(res) {
          public.experiences = res.content;
          $scope.$apply();
        });
      });
    });
  }

  $(".experienceContainer").delegate(".experience", "submit", function(e) {

    e.preventDefault();

    var experienceId = $(this)[0].elements["experienceId"].value;

    var experience = {
      company: $(this)[0].elements["company"].value, 
      position: $(this)[0].elements["position"].value, 
      startTime: "", 
      endTime: "", 
      description: $(this)[0].elements["description"].value
    }

    ajax.putStudentExperience(local.studentId, experienceId, experience);

  });

  $(".experienceContainer").delegate(".deleteExperience", "click", function(e) {
    e.preventDefault();

    var experienceId = $(this).closest(".experience")[0].elements["experienceId"].value;

    ajax.deleteStudentExperience(local.studentId, experienceId).done(function(res) {
      ajax.getStudentExperiences(local.studentId).done(function(res) {
        public.experiences = res.content;
        $scope.$apply();
      });
    });
  });

  init();

});
