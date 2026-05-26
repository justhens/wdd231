const API_KEY = '2c1076bff69d4f362459854d3ffe82c1';
const CITY = 'Davenport,FL,US';
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=imperial`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=imperial`;
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    getSpotlights();
    updateLastModified();
});
function updateLastModified() {
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
}
// Fetch current weather and forecast
async function getWeather() {
    try {
        const currentResponse = await fetch(WEATHER_URL);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);
        const forecastResponse = await fetch(FORECAST_URL);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error loading weather:", error);
        document.getElementById("current-weather").innerHTML = 
            '<p class="error">Unable to load weather data</p>';
        document.getElementById("forecast").innerHTML = 
            '<p class="error">Unable to load forecast</p>';
    }
}
// Display current weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
    });
    
    const weatherHTML = `
        <div class="current-display">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="temp-main">${temp}°F</div>
        </div>
        <div class="weather-description">${description}</div>
        <div class="weather-details">
            <p>High: ${high}°</p>
            <p>Low: ${low}°</p>
            <p>Humidity: ${humidity}%</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        </div>
    `;
    
    document.getElementById("current-weather").innerHTML = weatherHTML;
}

// Display 3-day forecast
function displayForecast(data) {
    const dailyForecasts = data.list.filter(item => 
        item.dt_txt.includes("12:00:00")
    ).slice(0, 3);
    
    let forecastHTML = '';
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        
        forecastHTML += `
            <div class="forecast-item">
                <p class="forecast-day">${dayName}: <strong>${temp}°F</strong></p>
            </div>
        `;
    });
    
    document.getElementById("forecast").innerHTML = forecastHTML;
}

// Fetch and display 3 spotlight members
async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        const qualifiedMembers = data.businesses.filter(
            business => business.membership === 2 || business.membership === 3
        );
        const selectedMembers = getRandomMembers(qualifiedMembers, 3);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}
function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
function displaySpotlights(members) {
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";
    
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card", "spotlight-card");
        
        const membershipBadge = member.membership === 3 ? 
            '<p class="membership gold">Gold Member</p>' : 
            '<p class="membership silver">Silver Member</p>';
        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline">${member.description}</p>
            <div class="spotlight-image">
                <img src="images/${member.image}" alt="${member.name}">
            </div>
            <div class="spotlight-contact">
                <p><strong>EMAIL:</strong> <a href="mailto:info@${member.website.replace('https://', '')}">${member.name.toLowerCase().replace(/ /g, '')}@email.com</a></p>
                <p><strong>PHONE:</strong> ${member.phone}</p>
                <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>
            ${membershipBadge}
        `;
        container.appendChild(card);
    });
}