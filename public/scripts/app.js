console.log("javascript is working!");

$(document).ready(function() {

  console.log("JQuery is working!");

  renderDaysRemainingMsg("5934b14527172844a5eac072");


  // testing moment.js
  var now = moment();
  console.log("now is:", now);
  var now2 = now.clone();
  var deadline = now2.add(7, 'days');
  console.log("deadline is:", deadline);
  var daysUntilDeadLine = deadline.diff(now, 'days');
  console.log("days until the deadline:", daysUntilDeadLine);
  console.log("deadline as javascript date:", deadline.toDate());


  /*
  **********************************************************
  * OPAQUE NAVBAR SCRIPT
  **********************************************************
  */

  // Toggle tranparent navbar when the user scrolls the page
  $(window).scroll(function() {
    if($(this).scrollTop() > 50)  /*height in pixels when the navbar becomes non opaque*/
    {
        $('.opaque-navbar').addClass('opaque');
    } else {
        $('.opaque-navbar').removeClass('opaque');
    }
  });

  $('.dropdown-toggle').dropdown();
  $('.project').modal(options)

});



function renderDaysRemainingMsg(projectID) {

  $.ajax({
    method: 'GET',
    url: '/api/projects/' + projectID,
    success: function(json) {

      var startDate = json[0].startDate;
      var numDaysToComplete = json[0].numDaysToComplete;
      
      console.log("start date:", startDate);
      console.log("days to complete:", numDaysToComplete);

    },
    error: function() {
      console.log("error retreiving project");
    }
  });


}
