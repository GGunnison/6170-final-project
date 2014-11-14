window.onload = function() {
  testTemplate = require('../views/templates/test.jade');
  html = testTemplate();

  document.getElementById('test').innerHTML = testTemplate();
}