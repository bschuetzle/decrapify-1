
console.log("javascript is working!");


$(document).ready(function() {



  // populate the Projects dropdown list
  populateProjectsDropdown();



  // console.log("document URI:",document.documentURI);
  // console.log("document URL:",document.documentURL);
  // console.log("hash:", location.hash);
  // console.log("location:", location);
  // console.log("location pathname:", location.pathname);
  // console.log("JQuery is working!");

  // split the pathname into an array
  var pathName = location.pathname;
  var pathArr = pathName.split("/");

  // if this is the projects page, display the project name, image, time remaining, and all the items
  if (pathArr[1] === "projects") {
    displayProject(pathArr[2]);
  };

  // var appendStr1 = `<li><a href="#" class="project-dropdown-items" data-id="1">Project 1</a></li>`;
  // var appendStr2 = `<li><a href="#" class="project-dropdown-items" data-id="2">Project 2</a></li>`;
  // $(".dropdown-menu").append(appendStr1);
  // $(".dropdown-menu").append(appendStr2);



  // var anchor = document.getElementById("myAnchor");
  // var result = anchor.hash; // Returns:'#youhou'
  // console.log("hash is:", result);

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


});


// open the create new project modal when the New Project dropdown item is selected
$(document).on("click", "#new-project-dropdown-item", function(e) {
  $('#project-modal').modal({
    fadeDuration: 1000,
    fadeDelay: 1.75
  });
});


// when the Save button within the create new project modal is clicked, call the start new project function
// to create/save the project in the database, get the items html and update it with the project details (name, photo, etc.)
$(document).on("click", "#save-project", function(e){
  startNewProject(e);
});

// Render All the Items

// when a project dropdown item is selected/clicked (other than New Project), get the project details and render within the items html page
$(document).on("click", ".project-dropdown-items", function(e) {

  var projectID = $(this).attr('data-id');
  console.log("project dropdown clicked:", projectID);
  window.location.href = `/projects/${projectID}/items`;

});




function populateProjectsDropdown() {

  // make an ajax call to get all projects
  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: function(json) {
      //console.log(json);
      json.forEach(function(element,index) {
        var appendStr = `<li><a href="#" class="project-dropdown-items" data-id="${element._id}">${element.name}</a></li>`;
        $(".dropdown-menu").append(appendStr);

        //console.log("element:",element);
      });

    },
    error: function() {
      console.log("error getting projects");
    }
  });


}


function startNewProject(e) {

  e.preventDefault();
  console.log("save project clicked");
  var newProject = {
    name: $("#new-project-name").val(),
    description: $("#new-project-description").val(),
    photoURL: $("#new-project-photo").val(),
    startDate: moment().startOf('day').toString(),
    numDaysToComplete: $("#new-project-days").val()
    };
  console.log(newProject);

  createNewProject(newProject);

  $('.project').modal('hide');

}

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

  var newItem = {
    description: $("#description").val(),
    project: $("#project").val(),
    photoURL: $("#photoURL").val(),
    category: $("#category").val(),
    };

  $(".form").trigger("reset");
  $("#item-modal").modal('hide');
  createNewItem(newItem);
  renderItem(newItem);
});

function renderItem(item) {

  var itemsHtml = (`
    <!-- items container! -->
      <div class="col-md-3 item-thingy" data-items-id="${item._id}">
        <div class="panel panel-default">
          <div class="panel-body">
            <!-- image frame -->
            <div class="row">
              <div class="col-md-10 col-md-offset-1 items-header">
                <span class='item-description'>${item.description}<br>${item.category}</span>
                <button type="button" id="trash" class="btn btn-default btn-sm" data-items-id="${item._id}"><span class="glyphicon glyphicon-trash"></span>Trash</button>
              </div>
              <div class="col-md-10 col-md-offset-1 items-image">
                <img src="${item.photoURL}" alt="item image">
              </div>
            </div>
            <!-- yes or no box -->
            <div class='panel-footer'>

              <!--${item.upVotes}<button class='btn btn-primary yes'>Yes!</button>-->
              <!--<button class='btn btn-danger no!'>No!</button>${item.downVotes}-->
              <button type="button" class="btn btn-default btn-up-votes"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>  ${item.upVotes}  </button>
              <button type="button" class="btn btn-default btn-down-votes"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>  ${item.downVotes}  </button>
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




function displayProject(projectID) {

  console.log("we will display project", projectID);

  // make an ajax call to get a single project object
  $.ajax({
    method: 'GET',
    url: '/api/projects/' + projectID,
    success: returnProject,
    error: function() {
      console.log("error getting project id:", projectID);
    }
  });

  function returnProject(json) {
    console.log("return project: ", json);
    var projectName = json[0].name;
    $(".project-name").text(projectName);
    var backgroundImgString = `url(\"${json[0].photoURL}\")`;
    $('.banner2').css('background-image', backgroundImgString);
    var daysRemaining = getDaysRemaining(json);
    $(".project-days-remaining").text(daysRemaining);
    console.log(daysRemaining);
    $("#items-list").empty();

    console.log("we know project id is still:", projectID);

    // make an ajax call to get all items for this project
    $.ajax({
      method: 'GET',
      url: '/api/projects/' + projectID + '/items',
      success: function(json) {
        console.log("within ajax, we know project id is still:", projectID);
        console.log("project items have been successfully retrieved:", json);
        renderMultipleItems(json);
      },
      error: function() {
        console.log("error getting project items for project:", projectID);
      }
    });

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
        //console.log(`You have ${daysUntilFinish} days to finish this project`);
        return `You have ${daysUntilFinish} days to finish this project`;
      } else {
        //console.log(`This project is now passed the due date`);
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
      console.log("project has been successfully saved:", json);
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
      console.log("returned project successfully: ", json);
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

$(document).on('click', '#trash', function(e) {
  console.log("deleteworks");
  var item_id = $(this).data('itemsId');
  deleteItem(item_id);
  $('div[data-item-id=' + item_id + ']').remove();
});


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
