//get the name input element and the submit button
const nameInput = document.getElementById('name-input');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.querySelector('#clear-btn');


//get the counter element
const counter1Element = document.getElementById("counter1");
const counter2Element = document.getElementById("counter2");
const counter3Element = document.getElementById("counter3");
const counter4Element = document.getElementById("counter4");
const counter5Element = document.getElementById("counter5");
//set the initial counter value
let counter1 = 2;
let counter2 = 1;
let counter3 = 2;
let counter4 = 3;
let counter5 = 2;

let changecounter = [];

function updateCounters(changecounter) {
  if (changecounter[0] === 1) {
    counter1++;
  }
  if (changecounter[1] === 1) {
    counter2++;
  }
  if (changecounter[2] === 1) {
    counter3++;
  }
  if (changecounter[3] === 1) {
    counter4++;
  }
  if (changecounter[4] === 1) {
    counter5++;
  }
  counter1Element.textContent = counter1;
  counter2Element.textContent = counter2;
  counter3Element.textContent = counter3;
  counter4Element.textContent = counter4;
  counter5Element.textContent = counter5;
}


//add a click event listener to the submit button
submitBtn.addEventListener('click', function() {

  //get the name input and selected checkboxes
  const nameInput = document.getElementById('name-input');
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
  const uncheckedCheckboxes = document.querySelectorAll('input[type=checkbox]:not(:checked)');
  
  //create an object to hold the user's data
  const userData = {
    name: nameInput.value,
    availability: []
  };

  if (userData.name === "") {
    const errorElement = document.createElement("p");
    errorElement.textContent = "Error: Please enter a name.";
    document.body.appendChild(errorElement);
  } else {
    
    // continue with the rest of your code
  
  
  //loop through the selected checkboxes and add their values to the userData object
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      changecounter.push(1); // Add 1 to changecounter if the checkbox is checked
    } else {
      changecounter.push(0); // Add 0 to changecounter if the checkbox is not checked
    }
    userData.availability.push(checkbox.value);
  });
  

  //save the userData object to local storage
  localStorage.setItem('userData', JSON.stringify(userData));
  
  //hide the name input and show the name text instead
  nameInput.style.display = 'none';
  const nameText = document.createElement('span');
  nameText.innerText = userData.name;
  nameInput.parentElement.insertBefore(nameText, nameInput);
  
  //gisable all checkboxes
  checkboxes.forEach(function(checkbox) {
    checkbox.disabled = true;
  });
  
  //gisable the submit button
  submitBtn.disabled = true;

  // Get all unchecked checkboxes and remove their parent element
  uncheckedCheckboxes.forEach(function(checkbox) {
    checkbox.style.display = 'none';
    checkbox.parentElement.removeChild(checkbox);
  
});

// Replace label text with checkmark icon for checked checkboxes
checkedCheckboxes.forEach(function(checkbox) {
  const label = checkbox.parentElement;
  label.innerHTML = '<i class="fas fa-check"></i>';
    // Update the counter and display it on the page

});

//update counters and display on page
updateCounters(changecounter);

}
  
});   


// Add a click event listener to the clear button
clearBtn.addEventListener('click', function() {

  // Clear the local storage
  localStorage.removeItem('userData');
  
  // Reload the page
  location.reload();
  
});

// Load the saved data from local storage
const savedData = localStorage.getItem('userData');

if (savedData) {

  // Parse the saved data into an object
  const userData = JSON.parse(savedData);
  
  // Hide the name input and show the name text instead
  const nameInput = document.getElementById('name-input');
  nameInput.style.display = 'none';
  const nameText = document.createElement('span');
  nameText.innerText = userData.name;
  nameInput.parentElement.insertBefore(nameText, nameInput);
  
  // Disable all checkboxes
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(function(checkbox) {
    checkbox.disabled = true;
  });
  
  // Disable the submit button
  submitBtn.disabled = true;
  
  // Set the checked state of the checkboxes based on the saved data
  userData.availability.forEach(function(value, index) {
    checkboxes[index].checked = (value === 'true');
  });
  
}
//clear local storage
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});


