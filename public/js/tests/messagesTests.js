var testStudentId = '4edd40c86762e0fb12000003';
var testEmployerId = '4edd40c86762e0fb12111113';
QUnit.config.reorder = false;

//Author Grant Gunnison

QUnit.begin( function () {
  $.ajax({
    type: 'POST',
    url: '/login',
    data: { email: 'test@mit.edu',
            password: 'test'
          }
  });
});

QUnit.done( function (details) {
  $.get('/logout');
});

QUnit.asyncTest( "GET student /messages", function( assert ) {
  expect(3);

  $.ajax({
    type: 'GET',
    url: '/messages',
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
      console.log("Response" + res);
      deepEqual(res.responseJSON.content.inbox, [], "returned empty inbox");
      deepEqual(res.responseJSON.content.sentbox, [], "returned empty sentbox");

    }
  }).always(start);
});

QUnit.asyncTest( "GET student /messages/sentbox", function( assert ) {
  expect(2);

  $.ajax({
    type: 'GET',
    url: '/messages/sentbox',
    success: function (data, status, res) {
      console.log(res.responseJSON.content);
      equal(res.status, 200, "200 status, success");
      deepEqual(res.responseJSON.content, [], "returned empty sentbox");

    }
  }).always(start);
});

QUnit.asyncTest( "GET student /messages/inbox", function( assert ) {
  expect(2);

  $.ajax({
    type: 'GET',
    url: '/messages/inbox',
    success: function (data, status, res) {
      console.log(res.responseJSON.content);
      equal(res.status, 200, "200 status, success");
      deepEqual(res.responseJSON.content, [], "returned empty inbox");

    }
  }).always(start);
});

QUnit.asyncTest( "POST student /messages/", function( assert ) {
  expect(1);

  $.ajax({
    type: 'POST',
    url: '/messages/4edd40c86762e0fb12111113',
    data: {
          to: 'test@mit.edu',
          from : 'employer@test.edu',
          title : "hello",
          content : "First test"
    },
    success: function (data, status, res) {
      $.ajax({
        type: 'GET',
        url: '/messages',
        success: function(data, status, res1){
          console.log("RES " + res.responseJSON.content[0]);
          console.log(res1.responseJSON.content.sentbox[0]._id);
          deepEqual(res.responseJSON.content[0], res1.responseJSON.content.sentbox[0]._id, "Successful post")
          $.ajax({
            type: 'DELETE',
            url: '/messages/' +res1.responseJSON.content.sentbox[0]._id,
            success: function(data, status, res){
              //equal(res.status, 200, "Successful delete");
            }
          }).always(start);
        }
      }).always(start);
  

    }
  }).always(start);
}); 

// QUnit.asyncTest( "DELETE student /messages/inbox", function( assert ) {
//   expect(2);

//   $.ajax({
//     type: 'DELETE',
//     url: '/messages/inbox/548481ea62e1550000887305',
//     success: function (data, status, res) {
//       console.log(res.responseJSON.content);
//       equal(res.status, 200, "200 status, success");
//       deepEqual(res.responseJSON.content, [], "returned empty inbox");

//     }
//   }).always(start);
// });






