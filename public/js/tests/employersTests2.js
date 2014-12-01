var testEmployerId = '4edd40c86762e0fb12111113';
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
QUnit.asyncTest( "GET /employers --search", function( assert ) {
  expect(1);
  //$.ajax({
    //type: 'POST',
    //url: '/employers/' + testEmployerId + '/listings',
    //data: { listing : { title : 'Test Listing',
                        //description : 'listing description',
                        //position : 'web developer',
                        //location : 'Boston',
                        //skills : []
                       //}
          //},
    //success: function (data, status, res) {
      //equal(res.status, 200, "200 status, success");

      //$.ajax({
        //type: 'GET',
        //url: '/employers',
        //data: { requiredSkills : ["1", "3", "7"]
              //},
        //success: function (data, status, res) {
          //equal(res.status, 200, "200 status, success");
        //}
      //})//.always(start);
    //}
  //}).always(start);
});
