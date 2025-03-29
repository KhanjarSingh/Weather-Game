const api_key = "e61529127f1b65acc0871495e96038cf";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";

async function Weather(city) {
    try {
        const response = await fetch(`${URL}${city}&appid=${api_key}&units=metric`);
        if (!response.ok) throw new Error("Weather Data Not Found");
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching Weather", err);
        return null;
    }
}

export default Weather;
