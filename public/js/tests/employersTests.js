// SABRINA: 4edd40c86762e0fb12111113
// SAM: 547b64a2b9c728fcadb0c933
var testEmployerId = '547b64a2b9c728fcadb0c933';
QUnit.config.reorder = false;

QUnit.begin( function () {
  $.ajax({
    type: 'POST',
    url: '/login',
    data: { email: 'employer@test.com',
            password: 'test'
          }
  });
});

QUnit.done( function (details) {
  $.get('/logout');
});

// check that when given a valid employerId, we get the correct employer back
QUnit.asyncTest( "POST /employers --search", function( assert ) {
  expect(1);
  $.ajax({
    type: 'POST',
    url: '/employers/' + testEmployerId + '/listings',
    data: { listing : { title : 'Test Listing',
                        description : 'listing description',
                        position : 'web developer',
                        location : 'Boston',
                        skills : []
                       }
          },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");

      $.ajax({
        type: 'POST',
        url: '/employers',
        data: { requiredSkills : ["1", "3", "7"]
              },
        success: function (data, status, res) {
          equal(res.status, 200, "200 status, success");
        }
      }).always(start);
    }
  }).always(start);
});

// check that when given a valid employerId, we get the correct employer back
QUnit.asyncTest( "GET /employers/:employerId --valid employerId", function( assert ) {
  expect(2);
  $.ajax({
    type: 'GET',
    url: '/employers/' + testEmployerId,
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
      equal(data.content.name, 'Test Employer', "correct employer returned");
    }
  }).always(start);
});

// if the employerId isn't an appropriate mongoose ObjectId we should get an internal server error
QUnit.asyncTest( "GET /employers/:employerId --invalid employerId", function( assert ) {
  expect(1);
  $.ajax({
    type: 'GET',
    url: '/employers/1',
    error: function (res, status, data) {
      equal(res.status, 500, "Invalid ObjectId");
    }
  }).always(start);
});

// if the employerId is a mongoose ObjectId but not one in the student database then we should get a 404 not found error
QUnit.asyncTest( "GET /employers/:employerId --employerId does not exist", function( assert ) {
  expect(1);
  $.ajax({
    type: 'GET',
    url: '/employers/1edd40c86762e0fb12000003',
    error: function (res, status, data) {
      equal(res.status, 404, "Student does not exist");
    }
  }).always(start);
});

// add a new listing to an employer
QUnit.asyncTest( "POST /employers/:employerId/listings --add a new listing", function () {
  expect(1);
  $.ajax({
    type: 'POST',
    url: '/employers/' + testEmployerId + '/listings',
    data: { listing : { title : 'Test Listing',
                        description : 'listing description',
                        position : 'web developer',
                        location : 'Boston',
                        skills : []
                       }
          },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

var testListingId = null;
// get the employer's listings and ensure the one we added was there
QUnit.asyncTest( "GET /employers/:employerId/listings --get all listings", function () {
  expect(2);
  $.ajax({
    type: 'GET',
    url: '/employers/' + testEmployerId + '/listings',
    success: function (data, status, res) {
      testListingId = data.content[0]._id;
      equal(data.content.length, 1, "only 1 listing set");
      equal(data.content[0].title, "Test Listing", "Listinis set correctly");
    }
  }).always(start);
});

// update the listing
QUnit.asyncTest( "PUT /employers/:employerId/listings/:listingId --update a listing", function () {
  expect(1);
  $.ajax({
    type: 'PUT',
    url: '/employers/' + testEmployerId + '/listings/' + testListingId,
    data: { listing : { title : 'Test Listing Updated',
                        description : 'listing description',
                        position : 'web developer',
                        location : 'Boston',
                        skills : []
                       }
          },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

// get just the single listing
QUnit.asyncTest( "GET /employers/:employerId/listings/:listingId --get a specific listing", function () {
  expect(1);
  $.ajax({
    type: 'GET',
    url: '/employers/' + testEmployerId + '/listings/' + testListingId,
    success: function (data, status, res) {
      equal(data.content.title, "Test Listing Updated", "Listing is updated as expected");
    }
  }).always(start);
});

// delete the listing
QUnit.asyncTest( "DELETE /employers/:employerId/listings/:listingId --delete a specific listing", function () {
  expect(1);
  $.ajax({
    type: 'DELETE',
    url: '/employers/' + testEmployerId + '/listings/' + testListingId,
    success: function (data, status, res) {
      $.get('/employers/' + testEmployerId + '/listings', function (data) {
        equal(data.content.length, 0, "listing was deleted");
      }).always(start);
    }
  });

});
