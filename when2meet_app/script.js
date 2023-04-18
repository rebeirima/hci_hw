   //this is getting the availability text from the doc
   const displayText = document.getElementById('display-text');

   //const displayText = document.getElementById('display-text');
  // displayText.id = 'display-text'; 
  // document.body.appendChild(displayText);

  // Get all the cells in the table
  const table2 = document.getElementById("table-2");
const cells = document.querySelectorAll('td');


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
        displayText.innerText = 'Available: You and Rima   Unavailable:';
    }
    else {
    //add the "unselected_cell" class to the matching cell in the second table
    matchingCell.classList.toggle("selected_cell_group");
    displayText.innerText = 'Available: You    Unavailable: Rima';
    }

    // Toggle the "selected_cell" class on the matching cell in the second table
    //matchingCell.classList.toggle("selected_cell_group");
    // Check the class of the clicked cell and display the appropriate text
  
}
  
 //trying to do the mouse over feature for the availabilty 

// Loop through each cell and add a mouseover event listener
cells.forEach(cell => {
  cell.addEventListener('mouseover', () => {
    // Check the class of the cell and display the appropriate text
    if (cell.classList.contains('unselected_cell_group')) {
      // Display text for unselected_cell_group cells
      displayText.innerText = 'Available:       Unavailable: You and Rima';
      displayTextOnScreen(displayText.innerText);
      console.log('This is a unselected_cell_group cell');
    } else if (cell.classList.contains('selected_cell_rima')) {
      // Display text for selected_cell_rima cells
      displayText.innerText = 'Available: Rima Unavailable: You';
      displayTextOnScreen(displayText.innerText);
      console.log('This is a selected_cell_rima cell');
    }else if (cell.classList.contains('selected_cell_rima_user')) {
        // Display text for selected_cell_rima_user cells
        displayText.innerText = 'Available: You and Rima   Unavailable:';
        displayTextOnScreen(displayText.innerText);
        console.log('This is a selected_cell_rima_user cell');
      }
    else {
      //display default text for other cells
      displayText.innerText = 'Available: You    Unavailable: Rima';
      displayTextOnScreen(displayText.innerText);
      console.log('Available: You Unavailable: Rima');
    }
  });
});

