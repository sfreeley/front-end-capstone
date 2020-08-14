# trackRx
Inspired by my experience as a pharmacist, and understanding that patients have a very difficult time managing multiple medications for multiple disease states, as well as understanding the reasons behind taking certain medications, and making sense of large amounts of information coming from their medical providers and pharmacists, this application sought to help alleviate some of this confusion.

## Application Overview
* What problem does your application solve? 

    * Users can document the drug name, dosage, dosage form, their patient specific directions, indication, and patient specific notes all in one place (ie doctor notes/comments or any questions they may have for their provider and/or pharmacist).

    * Users are also able to input prescription numbers and refills (if applicable) as well as last fill date and days supply, which will then automatically calculate their next refill date. 
    
    * A running, real-time countdown (by days) until next refill date for each individual medication will also be displayed on each individual medication entry to prevent users from running out of their medication.
    
    * Allow users to use a search tool to search for specific keywords regarding their medications within the application (ie 10 mg, drug name, indication, etc)

    * Users are able to upload any image (ie bottle, pill picture, reminders) and attach it to their medication entry for future reference (made possible through Cloudinary)
    
    * Provide resources for health and medication information in one place. By utilizing [health.gov external API](https://health.gov/our-work/health-literacy/consumer-health-content/free-web-content/apis-developers/how-use-api), users can select a health topic from a dropdown menu and click any of the links pertaining to the topic they wish to learn more about


## Installation
**Make sure you have Node.js and npm installed**
1. ```cd``` into your local directory you wish to clone this repository
2. ```git clone``` repository URL
3. ```npm install```
4. ```cd``` into ```api``` directory
5. ```touch database.json```
6. serve JSON file utilizing ```json-server -p 5002 -w database.json``` in terminal
> Note: Your database.json file is already in the .gitignore file for this project, so it will never be added to the repo or pushed up to Github.
7. ```npm start```
8. At this point, your browser should automatically launch the webpage
9. Register an account and it will send you to the homepage

## Usage
### JSON
Your database should be populated with the information you enter inside the application (ie drug information and user information)

If you have any questions regarding what the database structure should look like, please see "example.json" file in the ```api``` directory. Note that every property name needs to be identical to those listed in this example JSON file.

**PLEASE NOTE: NONE of the information used in the following images are that of real people or patients**
### Homepage
![trackRx homepage](src/images/homepageScreenshot.png)
1. User can click folder to add new medication entry
2. Upon clicking, a modal should appear
3. User can choose to add whatever image they would like or decide to add it later
4. All required fields are marked with '*' 
5. User can also search for any keywords regarding their medications and with every character typed into input field, the search function will narrow down the results (ie by dosage, name, indication, notes)

### Current Medication List
![trackRx homepage](src/images/currentMedicationListScreenshot.png)

### Medication History List
![trackRx homepage](src/images/medicationHistoryListScreenshot.png)

### Individual Medication Details View


### Resources



## Future Improvements Roadmap
I would like to add the ability for the user to register and create a profile, but also allow one user to create multiple profiles (ie for their spouse or children) so that families can keep all their medication tracking in one place without having to register different accounts 

I would like to improve on the application by adding a calendar feature where users can mark days they missed taking a particular medication

In addition, I would like to add a reminder (ie daily alarm) they can set to remind them to take their medication at a certain time

## Planning
1. [ERD](https://dbdiagram.io/d/5f146e1274ca2227330d8a66) 

2. [Wireframe](https://sketchboard.me/XCfnZXA8pWcG#/) 

