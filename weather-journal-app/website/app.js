/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseULR = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=53e0f16c273b81224d6cae71e9ef9199&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// console.log(newDate)

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction)

/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseULR, zipCode, apiKey)
    .then(function(data){
        postData('/weatherData', {temperature: data.main.temp, date: newDate, content: feelings})
        .then(function(){
            updateUi();
        })
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseULR, zip, key)=>{
    const res = await fetch(baseULR+zip+key)
    try{
        const data = await res.json();
        return data
    }catch(error){
        console.log('Error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data={})=>{
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await req.json()
        return newData
    }catch(error){
        console.log('Error', error)
    }
}

const updateUi = async ()=>{
    const req = await fetch('/allData')
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = 'Date:' + allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error){
        console.log('Error', error)
    }
}
