console.log("javascript is working!");

$(document).ready(function() {

  console.log("JQuery is working!");

  renderDaysRemainingMsg("5934b14527172844a5eac072");

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

  // Navbar dropdown menu
  $('.dropdown-toggle').dropdown();

  // Project  Modal
  $('.project').on('click', '.add-project', handleAddNewProject)
  $('.project').modal(options);


  // Items Page Click Event
  $('items-list').on('click', '.add-item', handleAddNewItem)

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
