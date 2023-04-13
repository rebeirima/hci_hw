# Implement a user-testable version of Doodle

### Key distinguishing characteristics between Doodle Poll and When2Meet that were implemented in this app from the user entering their availability side:
**User Interface:** Doodle has a more modern and visually appealing interface compared to When2Meet, which has a simpler and more basic layout <br>
**Scheduling Method:** Doodle shows users specific dates and times for a meeting that users can click to see which works with their schedule, while When2Meet focuses on selecting a single time slot that works for everyone where users can freely pick what time slots. <br>
**Availability Display:** When2Meet displays a visual representation of each participant's availability, while Doodle shows a counter of participants that selected each time slot. <br>


## Features Implemented
This app is a minimum user-testable implementation of a user's experience entering in their availability. There is hard coded data showing a pre-existing "doodle poll" where there are a series of five time slots that a user can pick from. There is also hard coded data to reflect imaginary others' availability. 
1. Users can enter their name and select which time slots fit with their schedule
2. Users can submit their name and time slots selected, and this will be saved in the computers local storage. So even if the user refreshes the page, their form entry will still be visable
3. If the user clicks submit before they enter their name in the participant box, an error will appear and will not submit their selected time slots until the user adds their name
4. Once the user clicks submit preferences, the counter updates to show the new updated amount of participants selecting each time slot. 

## Instructions to open the prototype:
1. To use this app, download and save the ZIP file from this repository to your computer and extract the contents to a folder
2. Navigate to the extracted folder and look for the index.html file
3. Double-click on the main HTML file to open it in your default web browser
