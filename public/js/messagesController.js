!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.main=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Grant Gunnison, Sam Edson
var MessagesController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.inboxTemplate = require('../../views/templates/mail/inbox.jade');
    local.sentTemplate = require('../../views/templates/mail/sent.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderInbox = function(data) {
      console.log('render');
      var inboxHTML = local.inboxTemplate({messages : data});
        $('#right_side').html(inboxHTML);
      }

    exports.renderSent = function(data) {
      var sentHTML = local.sentTemplate({messages : data});
        $('#right_side').html(sentHTML);
      }

    exports.deleteMessage = function(urlBase, id) {
      $.ajax({
        type: "DELETE",
        url: '/messages/' + urlBase + id,
        success: function(){
          if($('#sent').hasClass('selected')){
            $('#sent').click();
          } else {
            $('#inbox').click();
          }
        }
      });
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    //Initialize to have the inbox up to start
    $('#inbox').click();

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#inbox').on('click', function() {
      $.ajax({
        type: "GET",
        url: '/messages/inbox',
        success: function (data) {
          $('#inbox').addClass('selected');
          $('#sent').removeClass('selected');
          $('#create').removeClass('selected');

          helpers.renderInbox(data);
        }
      });
    });

    $('#sent').on('click', function() {
      $.ajax({
        type: "GET",
        url: '/messages/sentbox',
        success: function(data) {
          $('#inbox').removeClass('selected');
          $('#sent').addClass('selected');
          $('#create').removeClass('selected');
          helpers.renderSent(data);
        }
      });
    });

    $(document).on('click', '#deleteInbox', function(e) {
      e.stopPropagation();
      var id = $(this).parent().parent().parent().find('#id').text();      
      helpers.deleteMessage('inbox/', id);
    });
    $(document).on('click', '#deleteSentbox', function(e) {
      e.stopPropagation();
      var id = $(this).parent().parent().parent().find('#id').text();      
      helpers.deleteMessage('sentbox/', id);      
    });


    $(document).on('click', '.panel-body', function() {
        $(this).children('.rest').slideToggle();
      });
  }


  return {
    public: public,
    init: init
  }
}


var MessagesController = new MessagesController();
$(document).ready(function() {
  MessagesController.init();
});


},{"../../views/templates/mail/inbox.jade":4,"../../views/templates/mail/sent.jade":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":2}],4:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (messages) {
buf.push("");
jade_mixins["message"] = function(message, hasReply){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"panel panel-default\"><div class=\"panel-body\"><div id=\"id\" style=\"display:none;\">" + (jade.escape(null == (jade_interp = message._id) ? "" : jade_interp)) + "</div><div class=\"row\"><div style=\"text-overflow: ellipsis\" class=\"col-md-7\"><h5 style=\"margin-left:10px;\"><b>" + (jade.escape(null == (jade_interp = message.title) ? "" : jade_interp)) + "</b></h5></div><div class=\"col-md-5\"><h5 style=\"margin-right:10px;\" class=\"pull-right\">" + (jade.escape(null == (jade_interp = message.from) ? "" : jade_interp)) + "</h5></div></div><div style=\"display: none;\" class=\"row rest\"><hr/><div class=\"col-md-12\"><p>" + (jade.escape(null == (jade_interp = message.content) ? "" : jade_interp)) + "</p>");
if ( hasReply)
{
buf.push("<a style=\"display: inline;\"" + (jade.attr("id", "" + (message.fromId) + "", true, false)) + (jade.attr("name", "" + (message.from) + "", true, false)) + " class=\"createMessageBtn\"><i class=\"fa fa-mail-reply\"></i></a><a id=\"deleteInbox\">Delete</a>");
}
else
{
buf.push("<a id=\"deleteSentbox\">Delete</a>");
}
buf.push("</div></div></div></div>");
};
// iterate messages.content
;(function(){
  var $$obj = messages.content;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var message = $$obj[$index];

jade_mixins["message"](message, true);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var message = $$obj[$index];

jade_mixins["message"](message, true);
    }

  }
}).call(this);
}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined));;return buf.join("");
};
},{"jade/runtime":3}],5:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (messages) {
buf.push("");
jade_mixins["message"] = function(message, hasReply){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"panel panel-default\"><div class=\"panel-body\"><div id=\"id\" style=\"display:none;\">" + (jade.escape(null == (jade_interp = message._id) ? "" : jade_interp)) + "</div><div class=\"row\"><div style=\"text-overflow: ellipsis\" class=\"col-md-7\"><h5 style=\"margin-left:10px;\"><b>" + (jade.escape(null == (jade_interp = message.title) ? "" : jade_interp)) + "</b></h5></div><div class=\"col-md-5\"><h5 style=\"margin-right:10px;\" class=\"pull-right\">" + (jade.escape(null == (jade_interp = message.from) ? "" : jade_interp)) + "</h5></div></div><div style=\"display: none;\" class=\"row rest\"><hr/><div class=\"col-md-12\"><p>" + (jade.escape(null == (jade_interp = message.content) ? "" : jade_interp)) + "</p>");
if ( hasReply)
{
buf.push("<a style=\"display: inline;\"" + (jade.attr("id", "" + (message.fromId) + "", true, false)) + (jade.attr("name", "" + (message.from) + "", true, false)) + " class=\"createMessageBtn\"><i class=\"fa fa-mail-reply\"></i></a><a id=\"deleteInbox\">Delete</a>");
}
else
{
buf.push("<a id=\"deleteSentbox\">Delete</a>");
}
buf.push("</div></div></div></div>");
};
// iterate messages.content
;(function(){
  var $$obj = messages.content;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var message = $$obj[$index];

jade_mixins["message"](message, false);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var message = $$obj[$index];

jade_mixins["message"](message, false);
    }

  }
}).call(this);
}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined));;return buf.join("");
};
},{"jade/runtime":3}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL21lc3NhZ2VzQ29udHJvbGxlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwidmlld3MvdGVtcGxhdGVzL21haWwvaW5ib3guamFkZSIsInZpZXdzL3RlbXBsYXRlcy9tYWlsL3NlbnQuamFkZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGF1dGhvcjogR3JhbnQgR3Vubmlzb24sIFNhbSBFZHNvblxudmFyIE1lc3NhZ2VzQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbC5pbmJveFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL21haWwvaW5ib3guamFkZScpO1xuICAgIGxvY2FsLnNlbnRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9tYWlsL3NlbnQuamFkZScpO1xuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgZXhwb3J0cy5yZW5kZXJJbmJveCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXInKTtcbiAgICAgIHZhciBpbmJveEhUTUwgPSBsb2NhbC5pbmJveFRlbXBsYXRlKHttZXNzYWdlcyA6IGRhdGF9KTtcbiAgICAgICAgJCgnI3JpZ2h0X3NpZGUnKS5odG1sKGluYm94SFRNTCk7XG4gICAgICB9XG5cbiAgICBleHBvcnRzLnJlbmRlclNlbnQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgc2VudEhUTUwgPSBsb2NhbC5zZW50VGVtcGxhdGUoe21lc3NhZ2VzIDogZGF0YX0pO1xuICAgICAgICAkKCcjcmlnaHRfc2lkZScpLmh0bWwoc2VudEhUTUwpO1xuICAgICAgfVxuXG4gICAgZXhwb3J0cy5kZWxldGVNZXNzYWdlID0gZnVuY3Rpb24odXJsQmFzZSwgaWQpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIHVybDogJy9tZXNzYWdlcy8nICsgdXJsQmFzZSArIGlkLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKCQoJyNzZW50JykuaGFzQ2xhc3MoJ3NlbGVjdGVkJykpe1xuICAgICAgICAgICAgJCgnI3NlbnQnKS5jbGljaygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjaW5ib3gnKS5jbGljaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIC8vSW5pdGlhbGl6ZSB0byBoYXZlIHRoZSBpbmJveCB1cCB0byBzdGFydFxuICAgICQoJyNpbmJveCcpLmNsaWNrKCk7XG5cbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjaW5ib3gnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogJy9tZXNzYWdlcy9pbmJveCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgJCgnI2luYm94JykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgJCgnI3NlbnQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAkKCcjY3JlYXRlJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgICBoZWxwZXJzLnJlbmRlckluYm94KGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJyNzZW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6ICcvbWVzc2FnZXMvc2VudGJveCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAkKCcjaW5ib3gnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAkKCcjc2VudCcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICQoJyNjcmVhdGUnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICBoZWxwZXJzLnJlbmRlclNlbnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNkZWxldGVJbmJveCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJyNpZCcpLnRleHQoKTsgICAgICBcbiAgICAgIGhlbHBlcnMuZGVsZXRlTWVzc2FnZSgnaW5ib3gvJywgaWQpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjZGVsZXRlU2VudGJveCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJyNpZCcpLnRleHQoKTsgICAgICBcbiAgICAgIGhlbHBlcnMuZGVsZXRlTWVzc2FnZSgnc2VudGJveC8nLCBpZCk7ICAgICAgXG4gICAgfSk7XG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucGFuZWwtYm9keScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcucmVzdCcpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxuXG52YXIgTWVzc2FnZXNDb250cm9sbGVyID0gbmV3IE1lc3NhZ2VzQ29udHJvbGxlcigpO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIE1lc3NhZ2VzQ29udHJvbGxlci5pbml0KCk7XG59KTtcblxuIixudWxsLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5qYWRlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpLmZpbHRlcihudWxscykuam9pbignICcpIDogdmFsO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChtZXNzYWdlcykge1xuYnVmLnB1c2goXCJcIik7XG5qYWRlX21peGluc1tcIm1lc3NhZ2VcIl0gPSBmdW5jdGlvbihtZXNzYWdlLCBoYXNSZXBseSl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPjxkaXYgaWQ9XFxcImlkXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lO1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBtZXNzYWdlLl9pZCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IHN0eWxlPVxcXCJ0ZXh0LW92ZXJmbG93OiBlbGxpcHNpc1xcXCIgY2xhc3M9XFxcImNvbC1tZC03XFxcIj48aDUgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjEwcHg7XFxcIj48Yj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UudGl0bGUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYj48L2g1PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC01XFxcIj48aDUgc3R5bGU9XFxcIm1hcmdpbi1yaWdodDoxMHB4O1xcXCIgY2xhc3M9XFxcInB1bGwtcmlnaHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZS5mcm9tKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g1PjwvZGl2PjwvZGl2PjxkaXYgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIiBjbGFzcz1cXFwicm93IHJlc3RcXFwiPjxoci8+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48cD5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UuY29udGVudCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPlwiKTtcbmlmICggaGFzUmVwbHkpXG57XG5idWYucHVzaChcIjxhIHN0eWxlPVxcXCJkaXNwbGF5OiBpbmxpbmU7XFxcIlwiICsgKGphZGUuYXR0cihcImlkXCIsIFwiXCIgKyAobWVzc2FnZS5mcm9tSWQpICsgXCJcIiwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmF0dHIoXCJuYW1lXCIsIFwiXCIgKyAobWVzc2FnZS5mcm9tKSArIFwiXCIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiY3JlYXRlTWVzc2FnZUJ0blxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLW1haWwtcmVwbHlcXFwiPjwvaT48L2E+PGEgaWQ9XFxcImRlbGV0ZUluYm94XFxcIj5EZWxldGU8L2E+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8YSBpZD1cXFwiZGVsZXRlU2VudGJveFxcXCI+RGVsZXRlPC9hPlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO1xufTtcbi8vIGl0ZXJhdGUgbWVzc2FnZXMuY29udGVudFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBtZXNzYWdlcy5jb250ZW50O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wibWVzc2FnZVwiXShtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBtZXNzYWdlID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJtZXNzYWdlXCJdKG1lc3NhZ2UsIHRydWUpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJtZXNzYWdlc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZXM6dHlwZW9mIG1lc3NhZ2VzIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlczp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChtZXNzYWdlcykge1xuYnVmLnB1c2goXCJcIik7XG5qYWRlX21peGluc1tcIm1lc3NhZ2VcIl0gPSBmdW5jdGlvbihtZXNzYWdlLCBoYXNSZXBseSl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPjxkaXYgaWQ9XFxcImlkXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lO1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBtZXNzYWdlLl9pZCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IHN0eWxlPVxcXCJ0ZXh0LW92ZXJmbG93OiBlbGxpcHNpc1xcXCIgY2xhc3M9XFxcImNvbC1tZC03XFxcIj48aDUgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjEwcHg7XFxcIj48Yj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UudGl0bGUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYj48L2g1PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC01XFxcIj48aDUgc3R5bGU9XFxcIm1hcmdpbi1yaWdodDoxMHB4O1xcXCIgY2xhc3M9XFxcInB1bGwtcmlnaHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbWVzc2FnZS5mcm9tKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g1PjwvZGl2PjwvZGl2PjxkaXYgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIiBjbGFzcz1cXFwicm93IHJlc3RcXFwiPjxoci8+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48cD5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UuY29udGVudCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPlwiKTtcbmlmICggaGFzUmVwbHkpXG57XG5idWYucHVzaChcIjxhIHN0eWxlPVxcXCJkaXNwbGF5OiBpbmxpbmU7XFxcIlwiICsgKGphZGUuYXR0cihcImlkXCIsIFwiXCIgKyAobWVzc2FnZS5mcm9tSWQpICsgXCJcIiwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmF0dHIoXCJuYW1lXCIsIFwiXCIgKyAobWVzc2FnZS5mcm9tKSArIFwiXCIsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiY3JlYXRlTWVzc2FnZUJ0blxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLW1haWwtcmVwbHlcXFwiPjwvaT48L2E+PGEgaWQ9XFxcImRlbGV0ZUluYm94XFxcIj5EZWxldGU8L2E+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8YSBpZD1cXFwiZGVsZXRlU2VudGJveFxcXCI+RGVsZXRlPC9hPlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO1xufTtcbi8vIGl0ZXJhdGUgbWVzc2FnZXMuY29udGVudFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBtZXNzYWdlcy5jb250ZW50O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wibWVzc2FnZVwiXShtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbWVzc2FnZSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wibWVzc2FnZVwiXShtZXNzYWdlLCBmYWxzZSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcIm1lc3NhZ2VzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlczp0eXBlb2YgbWVzc2FnZXMhPT1cInVuZGVmaW5lZFwiP21lc3NhZ2VzOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyJdfQ==
