console.log("javascript is working!");

$(document).ready(function() {

  console.log("JQuery is working!");

  // TEST CODE
  // ---------

  // test function that builds a string to display the number of days remaining to complete the project
  //getRemainingDaysStr("5935ae1cdff29807a3089f58");

  // test function to create a new project
  /*
  createNewProject(
    {
      name: "Test Project 1",
      description: "Some description",
      photoURL: "http://www.kalsjdfks.jpg",
      startDate: "4/26/2017",
      numDaysToComplete: 10
    }
  );
  */

  // test function to get an existing project using project id
  //getProject("5934b14527172844a5eac073");

  // test function to get all items belong to a specific project
  //getItems("5934b14527172844a5eac072");

  // test function to create a new item under project "Kitchen Karma"
  /*
  createNewItem({
    description: "Blender",
    project:  "Kitchen Karma",
    photoURL: "http://www.blender.png",
    category: "Household Appliances",
    action: "Donate"
  });
  */

  // test function to delete an existing item using item id
  //deleteItem("5934bb0f90dc9645705b49fd");

  // test function to update an existing item
  //updateItem("5934b14527172844a5eac075", { action: "Sell", downVotes: 7 });

  // END OF TEST CODE
  // ----------------

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

$('.project').modal({
  fadeDuration: 1000,
  fadeDelay: 1.75 // Will fade in 750ms after the overlay finishes.
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

$(document).on("submit", "#item-modal", function(e){
  e.preventDefault();
  console.log("items to be added");
  var newItem = {
    description: $("#description").val(),
    project: $("#project").val(),
    photoURL: $("#photoURL").val(),
    category: $("#category").val(),
    };
  console.log(newItem);
  $(".item-form").trigger("reset");
  $("#item-modal").modal('hide');
  renderItem(newItem);
});

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

// function to add/save a new project to the database
function createNewProject(projectObj) {

  // make an ajax call to create a single project
  $.ajax({
    method: 'POST',
    url: '/api/projects/',
    data: projectObj,
    success: function(json) {
      console.log("project has been successfully saved:", json);
    },
    error: function() {
      console.log("error saving project");
    }
  });

}


// function to get a project from the database using the project id
function getProject(projectID) {

  // make an ajax call to get a single project object
  $.ajax({
    method: 'GET',
    url: '/api/projects/' + projectID,
    success: function(json) {
      console.log("project has been successfully retrieved:", json);
      return json;
    },
    error: function() {
      console.log("error getting project id:", projectID);
    }
  });

}


// function to add/save a new item to the database
function createNewItem(itemObj) {

  // make an ajax call to create a single item
  $.ajax({
    method: 'POST',
    url: '/api/items/',
    data: itemObj,
    success: function(json) {
      console.log("item has been successfully saved:", json);
    },
    error: function() {
      console.log("error saving item");
    }
  });

}


// function to delete an item from the database
function updateItem(itemID, itemObj) {

  // make an ajax call to update a single item
  $.ajax({
    method: 'PUT',
    url: '/api/items/' + itemID,
    data: itemObj,
    success: function(json) {
      console.log("item has been successfully updated:", json);
    },
    error: function() {
      console.log("error updating item");
    }
  });

}


// function to delete an item from the database
function deleteItem(itemID) {

  // make an ajax call to delete a single item
  $.ajax({
    method: 'DELETE',
    url: '/api/items/' + itemID,
    success: function(json) {
      console.log("item has been successfully deleted:", json);
    },
    error: function() {
      console.log("error deleting item");
    }
  });

}


// function to get all items that belong to a project
function getItems(projectID) {

  // make an ajax call to get all items for this project
  $.ajax({
    method: 'GET',
    url: '/api/projects/' + projectID + '/items',
    success: function(json) {
      console.log("project items have been successfully retrieved:", json);
      return json;
    },
    error: function() {
      console.log("error getting project items for project:", projectID);
    }
  });

}


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

      console.log("start date:", startDate);
      console.log("days to complete:", numDaysToComplete);
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
