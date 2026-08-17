# Counter-Strike 2 Statistics Tracker

A mobile statistics tracker for Counter-Strike 2, built with React Native and Expo. The application combines data from the Steam Web API and Leetify API to give players a clear view of their recent performance and in-game statistics.

## Features
Search for a player using their Steam profile
Validate Steam profile URLs before requesting player data
Retrieve and process statistics from the Steam Web API
Calculate player statistics including:
K/D ratio
Win rate
Accuracy
Headshot percentage
Weapon performance
Display weapon and map statistics
Retrieve recent match results from Leetify
Display the player's current Leetify rank
Present Steam and Leetify statistics within one mobile application
Technologies
React Native
Expo
JavaScript
Steam Web API
Leetify API
Git / GitHub
How It Works

The application retrieves player information from external APIs and processes the returned data before displaying it through the mobile interface.

Steam data is used to calculate and display detailed player and weapon statistics, while Leetify provides additional information such as recent match performance and current rank.

Project Motivation

I created this project because of my interest in Counter-Strike 2 and FPS games. I wanted to build a mobile application that brings useful player statistics together in one place while developing my skills in React Native, API integration, data processing and mobile application development.

## Project Status

🚧 Work in Progress

The application is still being developed, with further improvements and features planned.

### **Running the Project**

Clone the repository:

git clone <repository-url>

Navigate into the project:

cd counter-strike-2-tracker

Install the dependencies:

npm install

Start the Expo development server:

npx expo start

### ⚠️ Warniing: 


The application uses external APIs that may require API keys from steam, lettify and parse.bot. 

Please check the links bellow to **obtain** the API Key:

 1. [Steam](https://steamcommunity.com/dev/apikey) 
 2. [Leetify](https://api-public-docs.cs-prod.leetify.com/)   
 3.  [Parsse.bot](https://parse.bot/scrapers/318dac03-ea11-45b8-a6cc-b9569b703aee)


## Future Improvements
* Improve the presentation of player statistics
* Expand match and performance data
* Improve error handling and loading states
* Continue refining the mobile interface
* Add further statistics and visualisations

Author

Karim Elmouslemany

Computer Science Graduate

[LinkedIn](https://www.linkedin.com/in/karimelmouslemany/)
