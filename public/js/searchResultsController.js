(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
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

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    eventListeners();

  }


  var eventListeners = function() {
      $("#skillSubmit").on("click", function() {
        var requiredSkills = [];
        var desiredSkills  = [];

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

        if ($(this).attr("data-type") === "Student") {
          ajaxObj["url"] = "/employers";
        } else if ($(this).attr("data-type") === "Employer") {
          ajaxObj["url"] = "/students";
        }

        $.ajax(ajaxObj).done(function(res) {
          public.searchResults = res.content;
          console.log(res.content);
        });
      });
  }

  return {
    public: public,
    init: init
  }
}

var searchResultsController = new SearchResultsController();
$(document).ready(function() {
  searchResultsController.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL3NlYXJjaFJlc3VsdHNDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gYXV0aG9yOiBTYWJyaW5hIERyYW1taXNcbnZhciBTZWFyY2hSZXN1bHRzQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuXG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICB9XG5cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjc2tpbGxTdWJtaXRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlcXVpcmVkU2tpbGxzID0gW107XG4gICAgICAgIHZhciBkZXNpcmVkU2tpbGxzICA9IFtdO1xuXG4gICAgICAgICQoXCIucmVxdWlyZWRTa2lsbHNEcm9wIC5za2lsbCBzcGFuXCIpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgIHZhciBza2lsbF9pZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgICAgICAgIHJlcXVpcmVkU2tpbGxzLnB1c2goc2tpbGxfaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKFwiLmRlc2lyZWRTa2lsbHNEcm9wIC5za2lsbCBzcGFuXCIpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgIHZhciBza2lsbF9pZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgICAgICAgIGRlc2lyZWRTa2lsbHMucHVzaChza2lsbF9pZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHJlcXVpcmVkU2tpbGxzOiByZXF1aXJlZFNraWxscyxcbiAgICAgICAgICBkZXNpcmVkU2tpbGxzOiBkZXNpcmVkU2tpbGxzLFxuICAgICAgICAgIF9jc3JmOiBwdWJsaWMuY3NyZlxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFqYXhPYmogPSB7XG4gICAgICAgICAgZGF0YXR5cGU6IFwianNvblwiLFxuICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQodGhpcykuYXR0cihcImRhdGEtdHlwZVwiKSA9PT0gXCJTdHVkZW50XCIpIHtcbiAgICAgICAgICBhamF4T2JqW1widXJsXCJdID0gXCIvZW1wbG95ZXJzXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5hdHRyKFwiZGF0YS10eXBlXCIpID09PSBcIkVtcGxveWVyXCIpIHtcbiAgICAgICAgICBhamF4T2JqW1widXJsXCJdID0gXCIvc3R1ZGVudHNcIjtcbiAgICAgICAgfVxuXG4gICAgICAgICQuYWpheChhamF4T2JqKS5kb25lKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHB1YmxpYy5zZWFyY2hSZXN1bHRzID0gcmVzLmNvbnRlbnQ7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxudmFyIHNlYXJjaFJlc3VsdHNDb250cm9sbGVyID0gbmV3IFNlYXJjaFJlc3VsdHNDb250cm9sbGVyKCk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgc2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIuaW5pdCgpO1xufSk7XG4iXX0=
