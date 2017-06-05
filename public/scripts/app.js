console.log("javascript is working!");

$(document).ready(function() {

  console.log("JQuery is working!");

  //var str = getRemainingDaysStr("5934b14527172844a5eac072");
  getRemainingDaysStr("5935ae1cdff29807a3089f58");

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


/* function to build a string to display at the top of the page for a given project,
that will tell the user how many days remaining (if any) they have left */
function getRemainingDaysStr(projectID) {

  // make an ajax call to get a single project object
  $.ajax({
    method: 'GET',
    url: '/api/projects/' + projectID,
    success: function(json) {

      // save the start date and number of days to complete into variables
      var startDate = json[0].startDate;
      var numDaysToComplete = json[0].numDaysToComplete;

      // convert the start date into a moment object
      var startDate = moment(Date.parse(startDate));

      // save the current date as a moment object
      var today = moment().startOf('day');

      // calculate and save the finish date as a moment object
      var finishDate = startDate.clone().add(numDaysToComplete, 'days');

      // calculate and save the difference between the current date and the finish date
      var daysUntilFinish = finishDate.diff(today, 'days');

      // console.log("start date:", startDate);
      // console.log("days to complete:", numDaysToComplete);
      // console.log("finish date:", finishDate);
      // console.log("today:", today);
      // console.log("days remaining until finish:", daysUntilFinish);

      // return the string - if it is passed the finish date / deadline, return a different message otherwise indicate the number of days remaining
      if (daysUntilFinish >= 0) {
        console.log(`You have ${daysUntilFinish} days to finish this project`);
        return `You have ${daysUntilFinish} days to finish this project`;
      } else {
        console.log(`This project is now passed the due date`);
        return `This project is now passed the due date`;
      }

    },

    error: function() {
      console.log("error retreiving project");
    }

  });


}
