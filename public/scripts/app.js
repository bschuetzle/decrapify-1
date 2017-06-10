var itemID;
var itemToUpdate;
var descriptionUpdate;
var photoURLUpdate;
var updatedItem;

$(document).ready(function() {

  // populate the Projects dropdown list
  populateProjectsDropdown();

  // split the pathname into an array
  var pathName = location.pathname;
  var pathArr = pathName.split("/");

  // if this is the projects page, display the project name, image, time remaining, and all the items
  if (pathArr[1] === "projects") {
    displayProject(pathArr[2]);
  }


  // Toggle tranparent navbar when the user scrolls the page
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.opaque-navbar').addClass('opaque');
    } else {
      $('.opaque-navbar').removeClass('opaque');
    }
  });

  // Navbar dropdown menu
  $('.dropdown-toggle').dropdown();

});


// open the update the modal item
$(document).on("click", "#edit", function(e) {
  var itemID = $(this).attr('data-items-id');
  itemToUpdate = itemID;
  $('#edit-item-modal').data('items-id');
  $('#edit-item-modal').modal({
    fadeDuration: 1000,
    fadeDelay: 1.75
  });
});


// open the create new project modal when the New Project dropdown item is selected
$(document).on("click", "#new-project-dropdown-item", function(e) {
  $('#project-modal').modal({
    fadeDuration: 1000,
    fadeDelay: 1.75
  });
});


//open the item modal
$(document).on("click", ".btn-add-item", function(e) {
  $('#item-modal').modal({
    fadeDuration: 1000,
    fadeDelay: 1.75
  });
});


// friend invitation button
$(document).on("click", ".btn-ask-friend", function(e) {
  alert("message sent!");
});


// click event handler for up vote buttons
$(document).on("click", ".btn-up-votes", function(e) {
  var itemID = $(this).attr('data-items-id');
  var $countEl = $(this).closest(".panel-footer").find(".btn-up-vote-counter").first();
  var voteCount = $countEl.text().trim();
  var newVoteCount = parseInt(voteCount) + 1;

  $countEl.text(`  ${newVoteCount}  `);

  itemObj = {
    upVotes: newVoteCount
  };
  updateItem(itemID, itemObj);
});


// click event handler for down vote buttons
$(document).on("click", ".btn-down-votes", function(e) {
  var itemID = $(this).attr('data-items-id');
  var $countEl = $(this).closest(".panel-footer").find(".btn-down-vote-counter").first();
  var voteCount = $countEl.text().trim();
  var newVoteCount = parseInt(voteCount) + 1;

  $countEl.text(`  ${newVoteCount}  `);

  itemObj = {
    downVotes: newVoteCount
  };
  updateItem(itemID, itemObj);
});


// when the Save button within the create new project modal is clicked, call the start new project function
// to create/save the project in the database, get the items html and update it with the project details (name, photo, etc.)
$(document).on("click", "#save-project", function(e) {
  startNewProject(e);
});


// when a project dropdown item is selected/clicked (other than New Project), get the project details and render within the items html page
$(document).on("click", ".project-dropdown-items", function(e) {
  var projectID = $(this).attr('data-id');
  window.location.href = `/projects/${projectID}/items`;
});


// trash button to delete itom
$(document).on('click', '#trash', function(e) {
  var item_id = $(this).data('items-id');
  deleteItem(item_id);
  $('div[data-items-id=' + item_id + ']').remove();
});


// update items modal
$(document).on('submit', '#edit-item-modal', function(e) {
  e.preventDefault();

  var $modal = $('#edit-item-modal');
  descriptionUpdate = $modal.find("#new-description").val();
  photoURLUpdate = $modal.find("new-photoURL").val();
  var newDescription = $("#new-description").val();
  var imageURL = $("#new-photoURL").val();

  updatedItem = {};

  if (newDescription.length > 0) {
    updatedItem.description = newDescription;
  }

  if (imageURL.length > 0) {
    updatedItem.photoURL = imageURL;
  }


  $(".form").trigger("reset");
  $("#edit-item-modal").modal('hide');
  updateItem(itemToUpdate, updatedItem);
  location.reload()
});


// to populate projects dropdown menu
function populateProjectsDropdown() {
  // make an ajax call to get all projects
  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: function(json) {

      json.forEach(function(element, index) {
        var appendStr = `<li><a href="#" class="project-dropdown-items" data-id="${element._id}">${element.name}</a></li>`;
        $(".dropdown-menu").append(appendStr);
      });
    },
    error: function() {
      console.log("error getting projects");
    }
  });
}

// creates a new project
function startNewProject(e) {
  e.preventDefault();

  var newProject = {
    name: $("#new-project-name").val(),
    description: $("#new-project-description").val(),
    photoURL: $("#new-project-photo").val(),
    startDate: moment().startOf('day').toString(),
    numDaysToComplete: $("#new-project-days").val()
  };

  createNewProject(newProject);

  $('.project').modal('hide');
}


// Render All Items
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


// Create New Items for Project
$(document).on("submit", "#item-modal", function(e) {
  e.preventDefault();

  var newItem = {
    description: $("#description").val(),
    project: $("#project-name").text(),
    photoURL: $("#photoURL").val(),
    upVotes: 0,
    downVotes: 0
  };

  $(".form").trigger("reset");
  $(".form-item-modal").trigger('reset');
  $("#item-modal").modal('hide');
  createNewItem(newItem);
  renderItem(newItem);
});


// shows a single project
function displayProject(projectID) {

  // make an ajax call to get a single project object
  $.ajax({
    method: 'GET',
    url: '/api/projects/' + projectID,
    success: returnProject,
    error: function() {
      console.log("error getting project id:", projectID);
    }
  });

  //returns an entire project
  function returnProject(json) {

    var projectName = json[0].name;
    $(".project-name").text(projectName);
    var backgroundImgString = `url(\"${json[0].photoURL}\")`;
    $('.banner2').css('background-image', backgroundImgString);
    var daysRemaining = getDaysRemaining(json);
    $(".project-days-remaining").text(daysRemaining);
    $("#items-list").empty();

    // make an ajax call to get all items for this project
    $.ajax({
      method: 'GET',
      url: '/api/projects/' + projectID + '/items',
      success: function(json) {

        renderMultipleItems(json);
      },
      error: function() {
        console.log("error getting project items for project:", projectID);
      }
    });


    // days remaining counter
    function getDaysRemaining(json) {

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

      // return the string - if it is passed the finish date / deadline, return a different message otherwise indicate the number of days remaining
      if (daysUntilFinish >= 0) {
        return `You have ${daysUntilFinish} days to finish this project`;
      } else {
        return `This project is now passed the due date`;
      }
    }
  }
}


// function to add/save a new project to the database
function createNewProject(projectObj) {

  // make an ajax call to create a single project
  $.ajax({
    method: 'POST',
    url: '/api/projects/',
    data: projectObj,
    success: function(json) {
      window.location.href = `/projects/${json._id}/items`;
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

    },
    error: function() {
      console.log("error saving item");
    }
  });
}


// Renders an update item
function fetchAndReRenderItemId(itemID) {
  $.get('/api/items/' + itemID, function(data) {

    $('div[data-items-id=' + itemID + ']').remove();

    renderItem(data);
    console.log("am i working");
  });
}


// function to update an item from the database
function updateItem(itemID, itemObj) {

  // make an ajax call to update a single item
  $.ajax({
    method: 'PUT',
    url: '/api/items/' + itemID,
    data: itemObj,
    success: function(json) {

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

      return json;
    },
    error: function() {
      console.log("error getting project items for project:", projectID);
    }
  });
}

// Rendering Items to HTML
function renderItem(item) {

  var itemsHtml = (`
    <!-- items container! -->
      <div class="col-md-3 cards itemThing" data-items-id="${item._id}">
        <div class="panel panel-default">
          <div class="panel-body">
            <!-- image frame -->
            <div>
              <div class="items-header">
                <div class="icon-boxes">
                  <button type="button" id="edit" class="btn btn-default btn-sm icons" data-items-id="${item._id}"><span class="glyphicon glyphicon-pencil"></span></button>
                  <button type="button" id="trash" class="btn btn-default btn-sm icons" data-items-id="${item._id}"><span class="glyphicon glyphicon-trash"></span></button>
                </div>
                <span class='item-description'>${item.description}</span>
              </div>
              <div class="items-image">
                <img src="${item.photoURL}" alt="item image">
              </div>
            </div>
            <!-- yes or no box -->
            <div class='panel-footer'>

              <!--${item.upVotes}<button class='btn btn-primary yes'>Yes!</button>-->
              <!--<button class='btn btn-danger no!'>No!</button>${item.downVotes}-->


              <div class="btn-group" role="group">
                <!-- Keep / Up Votes -->
                <button type="button" class="btn btn-default btn-counters btn-up-vote-counter disabled" data-items-id="${item._id}">${item.upVotes}</button>
                <button type="button" class="btn btn-default btn-votes btn-up-votes" data-items-id="${item._id}"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>   Keep</button>
              </div>

              <!-- Let Go / Down Votes -->
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-default btn-votes btn-down-votes" data-items-id="${item._id}"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>   Let Go</button>
                <button type="button" class="btn btn-default btn-counters btn-down-vote-counter disabled" data-items-id="${item._id}">${item.downVotes}</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    `);
  $('#items-list').append(itemsHtml);
}
