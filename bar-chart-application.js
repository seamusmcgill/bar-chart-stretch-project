// Create a variable to store the number of categories
let cat = 1;

// Function to add form categories
function addCategory() {
  // Use the template for new category section to create a new variable
  let newCat = '<div class="form-row data-entry category-'+ (cat + 1) +'">'+$(".data-entry-copy").html()+'</div>';
  // Insert it following the last category row
  $("body").find(".data-entry:last").after(newCat);
  // Move the "add category button" into the bottom-most category
  $(".category-" + cat + " #add-category").appendTo(".category-" + (cat + 1) + " .form-column:first");
  // Loop through each label in the category form and update the "for" to the next category number
  $(".category-" + (cat + 1) + " label").each(function(index) {
    $(this).attr("for", ($(this).attr("for").replace("category-x", "category-" + (cat + 1))));
  })
  // Loop through each input and update the associated ID/class to the next category number
  $(".category-" + (cat + 1) + " input").each(function(index) {
    if ($(this).attr("id")) {
      $(this).attr("id", ($(this).attr("id").replace("category-x", "category-" + (cat + 1))));
    } else {
      $(this).attr("class", ($(this).attr("class").replace("category-x", "category-" + (cat + 1))));
    }
  })
  //Update the add category value button class to the next category number
  $(".category-" + (cat + 1) + " button[class*='category-x']").attr("class",
  $(".category-" + (cat + 1) + " button[class*='category-x']").attr("class").replace("category-x", "category-" + (cat + 1)));

  cat++;
}

// Function to add a value in the category
function addCategoryValue() {
  // Create empty variable to store current category
  let currentCat = "";
  // Extract the category number of the add value button just clicked
  if ($(this).attr("class") === "add-category-1-value category-1") {
    currentCat = $(this).attr("class").slice(30);
  } else {
    currentCat = $(this).attr("class").slice(28);
  }

  // Create a new category value input section for selected category
  let newCatValue = "<br> <div class='category-" + currentCat + "-value-input'>" +$(".category-value-copy").html() + "</div>";
  // Insert after the button just pressed
  $(this).after(newCatValue);
  // Loop through each label and update the "for" to the current category
  $(".category-" + currentCat + "-value-input label").each(function(index) {
    $(this).attr("for", ($(this).attr("for").replace("category-x", "category-" + currentCat)));
  })
  // Loop through each input and update the "class" to the current category
  $(".category-" + currentCat + "-value-input input").each(function(index) {
    $(this).attr("class", ($(this).attr("class").replace("category-x", "category-" + currentCat)));
  })
}

function collectAppearanceData() {
  // Collect all the appearance data from the first half of the chart
  let options = {
    title: $("#chart-title").val(),
    font: $("#title-font").val(),
    size: $("#title-size").val(),
    color: $("#title-color").val(),
    yAxis: $("#y-axis-label").val(),
    xAxis: $("#x-axis-label").val(),
    labelPos: $("#value-label-position").val(),
    spacing: $("#bar-spacing").val()
  };
  console.log(options);
}

function collectChartData() {
  let userData = [];
  for (let i = 1; i <= cat; i++) {
    // Grab category details from user input form
    let category = {
      name: $("#category-" + i + "-name").val(),
      color: $("#category-" + i + "-label-color").val(),
      valueColor: $(".category-" + i + "-value-color").val()
    }
    // Check if there was more than one value entered for the category
    if ($(".category-" + i + "-value").length > 1) {
      // Create an array for the category values if so
      category.value = [];
      // Loop through all the data values
      $(".category-" + i + "-value").each(function() {
        category.value.push(parseInt($(this).val()));
      })
    } else {
      category.value = parseInt($(".category-" + i + "-value").val());
    }
    // Push into data array
    userData.push(category);
  }
  console.log(userData);
  return userData;
}

function drawBarChart(data, options, element) {
  let largestValue = 0;
  for (let i = 0; i < cat; i++) {
    if (Array.isArray(data[i]["value"])) {
      for (let j = 0; j < data[i]["value"].length; j++) {
        if (data[i]["value"][j] > largestValue) {
          largestValue = data[i]["value"][j];
        }
      }
    }
    else if (data[i]["value"] > largestValue) {
      largestValue = data[i]["value"];
    }
    console.log("Pass " + i  + " the largest value is: " + largestValue);
  }
}

// jQuery code to run functions on event handler instances
$(document).ready(function() {
  // Hide bar chart, title and x-axis and labels on load
  $(".chart-title").hide();
  $(".chart-container").hide();
  $(".x-axis").hide();
  $(".x-axis-label").hide();
  // Add category on button click
  $("#add-category").click(addCategory);
  // Add category value when button clicked
  // For adding values to the first form that is already on the page
  $(".add-category-1-value").click(addCategoryValue);
  // For adding values to dynamically generated categories
  $("div").on("click", ".add-category-value", addCategoryValue);
  // Collect user inputted data on submit
  $("#submit").click(collectAppearanceData);
  $("#submit").on("click", function() {
    drawBarChart(collectChartData());
  });
});
