

  function handleButtonClick() {
    $(".selected_cell").each(function(index) {
      console.log($(this).prop('id'));
    });
  }

  function saveName() {
    const nameInput = document.getElementById('name-input');
    const namePlaceholder = document.getElementById('name-placeholder');

    namePlaceholder.innerText = nameInput.value;
  }

//define a function to handle cell clicks
function handleCellClick(cell) {
    // Toggle the "selected_cell" class on the clicked cell
    cell.classList.toggle("selected_cell");
    // Get the ID of the clicked cell
    var cellID = cell.id;
    // Find the corresponding cell in the second table
    var matchingCell = document.getElementById("second_" + cellID);
    
    console.log(matchingCell)
    console.log(matchingCell.classList)
    if(matchingCell.classList.contains("selected_cell_rima")) {
        matchingCell.classList.toggle("selected_cell_rima_user");
    }
    else {
    //add the "unselected_cell" class to the matching cell in the second table
    matchingCell.classList.toggle("selected_cell_group");
    }

    // Toggle the "selected_cell" class on the matching cell in the second table
    //matchingCell.classList.toggle("selected_cell_group");
  
}
  
    
  


//trying to do the mouse over feature 
const table2 = document.getElementById("table-2");
const statusDiv = document.getElementById("availability-status");

// Add event listener for mouseover on the table
table2.addEventListener("mouseover", (event) => {
    // Get the target element of the event
    const target = event.target;
   
      
      // Set the availability status text
      statusDiv.textContent = "rima is available";

  });

  
// Add event listener for mouseout on the table
table2.addEventListener("mouseout", (event) => {
    // Clear the availability status text
    statusDiv.textContent = "";
  });
  