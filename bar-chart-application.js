// Create a variable to store the number of categories
let cat = 1;
let data = {};
let options = {};


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
    $(this).attr("for", ($(this).attr("for").replace("category-1", "category-" + (cat + 1))));
  })
  // Loop through each input and update the ID to the next category number
  $(".category-" + (cat + 1) + " input").each(function(index) {
    $(this).attr("id", ($(this).attr("id").replace("category-1", "category-" + (cat + 1))));
  })
  //Update the add category value button class to the next category number
  $(".category-" + (cat + 1) + " button[class*='category-1']").attr("class",
  $(".category-" + (cat + 1) + " button[class*='category-1']").attr("class").replace("category-1", "category-" + (cat + 1)));

  cat++;

}

function collectAppearanceData() {
  options = {
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
  for (let i = 1; i <= cat; i++) {
    data["category" + i  + "Name"] = $("#category-" + i + "-name").val();
    data["category" + i + "Color"] = $("#category-" + i + "-label-color").val();
    data["category" + i + "Value1"] = $("#category-" + i + "-value-1").val();
    data["category" + i + "Value1Color"] = $("#category-" + i + "-value-1-color").val();
  }
  console.log(data);
}

// jQuery code to run functions on event handler instances
$(document).ready(function() {
  $
  // Hide bar chart, title and x-axis and labels on load
  $(".chart-title").hide();
  $(".chart-container").hide();
  $(".x-axis").hide();
  $(".x-axis-label").hide();
  // Add category on button click
  $("#add-category").click(addCategory);
  $("#submit").click(collectAppearanceData);
  $("#submit").click(collectChartData);
});
