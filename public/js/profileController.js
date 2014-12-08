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

    public.listingSkills = {};
    public.listings = [];

    ajax.getAllSkills().done(function(res) {
      public.skills = res.content;
      for (var i = 0; i < res.content.length; i++) {
        var obj = res.content[i];
        public.skillsMap[obj._id] = obj.name;
      }

      $scope.$apply();

    });

    ajax.getAllClasses().done(function(res) {
      public.klasses = res.content;
      for (var i = 0; i < res.content.length; i++) {
        var obj = res.content[i];
        public.classesMap[obj._id] = obj.name;
      }

      $scope.$apply();
    });

    if (local.userType == "student") {
      ajax.getStudentSkills(local.userId).done(function(res) {
        for (var i = 0; i < res.content.length; i++) {
          public.studentSkills[res.content[i]._id] = res.content[i].name;
        }
        $scope.$apply();
      });

      ajax.getStudentClasses(local.userId).done(function(res) {
        for (var i = 0; i < res.content.length; i++) {
          public.studentClasses[res.content[i]._id] = res.content[i].name;
        }
        $scope.$apply();
      });

      ajax.getStudentExperiences(local.userId).done(function(res) {
        public.experiences = res.content;
        $scope.$apply();
      });
    } else if (local.userType == "employer") {
      ajax.getEmployerListings(local.userId).done(function(res) {
        public.listings = res.content;
        console.log(public.listings);
        $scope.$apply();
      });
    }
  }

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.userType = $("#userType")[0].value;
    if (local.userType == "student") {
      local.userId = $("#studId")[0].value;
    } else if (local.userType == "employer") {
      local.userId = $("#empId")[0].value;
    }
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

    exports.putStudentSkills = function(studentId) {

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

    exports.putStudentClasses = function(studentId) {

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

    exports.getEmployerListings = function(employerId) {
      return $.ajax({
        datatype: "json", 
        type: "GET", 
        url: "/employers/" + employerId + "/listings"
      });
    }

    exports.postEmployerListing = function(employerId, listing) {
      var body = {
        listing: listing
      }

      return $.ajax({
        datatype: "json", 
        type: "POST", 
        url: "/employers/" + employerId + "/listings", 
        data: body
      });
    }

    exports.putEmployerListing = function(employerId, listingId, listing) {
      var body = {
        listing: listing
      }

      return $.ajax({
        datatype: "json", 
        type: "PUT", 
        url: "/employers/" + employerId + "/listings/" + listingId, 
        data: body
      });
    }

    exports.deleteEmployerListing = function(employerId, listingId) {
      return $.ajax({
        datatype: "json", 
        type: "DELETE", 
        url: "/employers/" + employerId + "/listings/" + listingId
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

    if (local.userType == "student") {
      ajax.getStudentSummary(local.userId).done(function(res) {
        $("#summaryInput").val(res.content);
      });
      eventListeners.students();
    } else if (local.userType == "employer") {
      eventListeners.employers();
    }

    eventListeners.main();
  }

  var sizingJS = function() {}

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = (function() {

    var exports = {};

    exports.main = function() {
      (function() {
        var counter = 0;
        $("#summaryInput").on("keyup", function() {
          public.savingSummary = true;
          $scope.$apply();
          if (counter == 0) {
            counter = 1000;
            setTimeout(function() {
              counter = 0;

              ajax.putStudentSummary(local.userId).done(function() {
                public.savingSummary = false;
                $scope.$apply();
              });
            }, 2000);
          }

        });
      })();
    }

    exports.students = function() {
      $("#skillsCont").delegate(".skill", "click", function() {

        var id = $(this).children().attr("id");
        var name = public.skillsMap[id];

        public.studentSkills[id] = name;
        $scope.$apply();

        ajax.putStudentSkills(local.userId);
      });

      $(".skillsContainer").delegate(".skill", "click", function() {

        var id = $(this).children().attr("id");
        var name = public.skillsMap[id];

        delete public.studentSkills[id];
        $scope.$apply();

        ajax.putStudentSkills(local.userId);
      });

      $("#classesCont").delegate(".class", "click", function() {
        var id = $(this).children().attr("id");
        var name = public.classesMap[id];

        console.log(id);
        console.log(name);

        public.studentClasses[id] = name;
        $scope.$apply();

        ajax.putStudentClasses(local.userId);
      });

      $(".classesContainer").delegate(".class", "click", function() {

        var id = $(this).children().attr("id");
        var name = public.classesMap[id];

        delete public.studentClasses[id];
        $scope.$apply();

        ajax.putStudentClasses(local.userId);
      });

      $("#experienceForm").on("submit", function(e) {

        e.preventDefault();

        var experience = {
          company: $(this)[0].elements["company"].value, 
          position: $(this)[0].elements["position"].value, 
          startTime: "", 
          endTime: "", 
          description: $(this)[0].elements["description"].value
        }

        ajax.postStudentExperience(local.userId, experience).done(function(res) {
          ajax.getStudentExperiences(local.userId).done(function(res) {
            public.experiences = res.content;
            $scope.$apply();
          });
        });
      });

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

        ajax.putStudentExperience(local.userId, experienceId, experience);
      });

      $(".experienceContainer").delegate(".deleteExperience", "click", function(e) {
        e.preventDefault();

        var experienceId = $(this).closest(".experience")[0].elements["experienceId"].value;

        ajax.deleteStudentExperience(local.userId, experienceId).done(function(res) {
          ajax.getStudentExperiences(local.userId).done(function(res) {
            public.experiences = res.content;
            $scope.$apply();
          });
        });
      });
    }

    exports.employers = function() {
      $("#addSkillBtn").on("click", function() {
        var skill_id = $("#skillSelect")[0].options[$("#skillSelect")[0].selectedIndex].value;
        var skill_name = $("#skillSelect")[0].options[$("#skillSelect")[0].selectedIndex].text;

        public.listingSkills[skill_id] = skill_name;
        console.log("skills: ", public.listingSkills);
        $scope.$apply();
      });

      $("#listingForm").on("submit", function(e) {

        e.preventDefault();

        console.log($(this)[0].elements);

        var skills = [];

        for (skill in public.listingSkills) {
          var skillObj = {};
          skillObj[""] = {skill: public.listingSkills[skill]};
          skills.push(skillObj);
        }

        var listing = {
          title: $(this)[0].elements["title"].value, 
          description: $(this)[0].elements["description"].value, 
          position: $(this)[0].elements["position"].value, 
          location: $(this)[0].elements["location"].value, 
          skills: skills
        };

        ajax.postEmployerListing(local.userId, listing).done(function(res) {
          ajax.getEmployerListings(local.userId).done(function(res) {
            public.listings = res.content;
            public.listingSkills = {};
            $scope.$apply();
          });
        });
      });

      $("#skillsCont").delegate(".skill", "click", function() {

        var id = $(this).children().attr("id");
        var name = public.skillsMap[id];

        public.listingSkills[id] = name;
        $scope.$apply();
      });

      $(".skillsContainer").delegate(".skill", "click", function() {

        var id = $(this).children().attr("id");
        var name = public.skillsMap[id];

        delete public.listingSkills[id];
        $scope.$apply();
      });

      $(".listingsContainer").delegate(".listing", "submit", function(e) {

        e.preventDefault();

        var listingId = $(this)[0].elements["listingId"].value;

        var listing = {
          title: $(this)[0].elements["title"].value, 
          description: $(this)[0].elements["description"].value, 
          position: $(this)[0].elements["position"].value, 
          location: $(this)[0].elements["location"].value, 
          skills: skills
        };

        ajax.putEmployerListing(local.userId, listingId, experience);
      });

      $(".listingsContainer").delegate(".deleteListing", "click", function(e) {
        e.preventDefault();

        var listingId = $(this).closest(".listing")[0].elements["listingId"].value;

        ajax.deleteEmployerListing(local.userId, listingId).done(function(res) {
          ajax.getEmployerListings(local.userId).done(function(res) {
            public.listings = res.content;
            console.log("listing: ", public.listings);
            $scope.$apply();
          });
        });
      });
    }

    return exports;
  })();

  init();

});
