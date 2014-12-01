var testEmployerId = '4edd40c86762e0fb12222223';
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

// check searching works
QUnit.asyncTest( "GET /employers --search", function( assert ) {
  expect(2);
  $.ajax({
    type: 'POST',
    url: '/employers/' + testEmployerId + '/listings',
    data: { listing : { title : 'Test Listing',
                        description : 'listing description',
                        position : 'web developer',
                        location : 'Boston',
                        skills : ["3"]
                       }
          },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");

      $.ajax({
        type: 'GET',
        url: '/employers',
        data: { requiredSkills : ["1", "2", "3", "4"]
              },
        success: function (data2, status2, res2) {
          equal(res2.status, 200, "200 status, success");
          console.log(res2);
          console.log(data2);          
        }
      }).always(start);
    }
  });
});
