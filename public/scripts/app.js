console.log("javascript is working!");

$(document).ready(function() {

  console.log("JQuery is working!");

  // OPAQUE NAVBAR SCRIPT
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
