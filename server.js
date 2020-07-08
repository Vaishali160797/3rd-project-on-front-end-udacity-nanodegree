// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;

// Setup Server
const server = app.listen(port, listening);
 function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

//get route to return the projectdata object
app.get('/all', sendData)

function sendData(request, response){
    response.send(projectData)
}

//post route
app.post('/weatherData', addData)

function addData(req, res){
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userresponse = req.body.userresponse;
    res.end();
}