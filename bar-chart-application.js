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

// jQuery code to run functions on event handler instances
$(document).ready(function() {
  // Add category on button click
  $("#add-category").click(addCategory);
});
