// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
app.listen(port, listening);
// Setup Server
function listening(){
    console.log(`running on localhost: ${port}`);
}

app.get('/allData', function(req, res){
    res.send(projectData)
})

app.post('/weatherData', addData)

function addData(req, res){
    projectData.temp = req.body.temperature;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    res.end();
    console.log(projectData)
}

