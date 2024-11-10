const weatherForm= document.querySelector(".weatherForm");
const cityInput= document.querySelector(".cityInput");
const card= document.querySelector(".card");
const apiKey="7e641ca9089a858c3c63ed087c166ae9";

weatherForm.addEventListener("submit", async event=>{

    event.preventDefault(); // forms should reload the form every time to prevent that we write this line

    const city=cityInput.value;
    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city"); 
    }
});
async function getWeatherData(city) {

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response= await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not found weather data");
    }
    return await response.json();
}
function displayWeatherInfo(data){
    
    const {name:city,
            main:{temp,humidity},
            weather:[{description,id}]}=data;
    
    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1"); // we can write this html page also 
    const tempDisplay=document.createElement("p");  //we already write these obejects in html and style them with css already but we display none there  in div tag
    const humidityDisplay=document.createElement("p"); // by those only in first we created card
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity:${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getweatherEmoji(id);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}
function getweatherEmoji(weatherId){

    switch(true){
        case (weatherId >=200 && weatherId < 300):
            return "⛈️";
        case (weatherId >=300 && weatherId < 400):
            return "🌧️";
        case (weatherId >=500 && weatherId < 600):
            return "🌧️";
        case (weatherId >=600 && weatherId < 700):
            return "❄️";
        case (weatherId >=700 && weatherId < 800):
            return "🌫️";
        case (weatherId >=800 ):
            return "☀️";
        case (weatherId >=801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}
function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}
