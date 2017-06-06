console.log("javascript is working!");

$(document).ready(function() {

  console.log("JQuery is working!");

  renderDaysRemainingMsg("5934b14527172844a5eac072");

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
  // $('.project').on('click', '.add-project', handleAddNewProject)
  // $('.project').modal(options);

  // Items Page Click Event
  // $('.items-list').on('click', '.add-item', handleAddNewItem)
  // $('.items-list').on('click', '.delete-item', handleDeleteItemClick);

});

// Render Items
$.ajax({
  method: 'GET',
  url: '/api/items',
  success: renderMultipleItems
});

function renderMultipleItems(items) {
  items.forEach(function(item) {
    renderItem(item);
  });
}

$('#item-modal').on('submit', function(e) {
  e.preventDefault();
  var formData = $(this).serialize();
  console.log('formData', formData);
  $.post('/api/items', formData, function(item) {
    console.log('item after POST', item);
    renderItem(item);  //render the server's response
  });
  $(this).trigger("reset");
});

var $itemModal = $('#item-modal');

console.log($itemModal.description);

function renderItem(item) {

  var itemsHtml = (`
    <!-- items container! -->
    <div class="col-md-3">
      <div class="panel panel-default">
        <div class="panel-body">
          <!-- image frame -->
          <div class="row" data-items-id="${item._id}">
            <div class="col-md-10 col-md-offset-1 items-header">
              <span class='item-description'>${item.description}<br>${item.category}</span>
            </div>
            <div class="col-md-10 col-md-offset-1 items-image">
              <img src="${item.photoURL}" alt="item image">
            </div>
          </div>
          <!-- yes or no box -->
          <div class='panel-footer'>
            <div class='panel-footer'>
              <button class='btn btn-primary yes'>Yes!</button>
              <button class='btn btn-danger no!'>No!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
    $('#items-list').prepend(itemsHtml);
}

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
