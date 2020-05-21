# stock-tweet
Stock Twits Twitter Feed

## Description

This is an app developved for a coding challenge. Upon loading, the app automatically makes a call to the Stock Twits API to get the 30 currently trending stock symbols. The app then displays these symbols, providing the user with suggestions on which stock feeds to follow. The user is able to enter up to 5 stock symbols to add to a subscription list. Since the Stock Twits API limits calls to 200 per hour, this application sets a limit of 5 stocks to add to the subscription list. This allows the app to update the twit feed with the latest tweets every 90 seconds.

The user is able to choose to display all the messages or filter and see messages from one particular stock. The user is also able to delete a stock from the subscription list and then add different symbols to the subscription. This project was time constrained and focused on delivering a functional and deployable MVP. 

The current project is deployed on AWS at: http://34.215.30.234/

The project was built from scratch with React and Webpack and utilizes a simple node server with Express. Since the API prevents CORS, all API calls were routed throught the local server. 

### Tech Stack

React
Node.js
JavaScript
Styled-Components
Material-UI
Moment (React-Moment)
Docker 
AWS
Express 
Babel
WebPack

### Run Locally

To run the app, clone the repo to the local machine. Run 'npm install' to install all dependencies. Then run 'npm run build' to build the bundle to the dist folder. Finally run 'npm start' in the server. Currently the port is set to 80 for deployment, but should be changed on the server to 3000 (or similar port) to display on local machine. 
