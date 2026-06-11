import { useState } from 'react';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App(){

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async() => {
    setWeather(null);

    try {
    setLoading(true);
    setError("");
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    if(data.cod !== 200){
      setError(data.message);
      setWeather(null);
      return;
    }
    setWeather(data);
    } catch (err) {
      setError("Failed to fetch data, Please try again");
    } finally{
      setLoading(false);
    }
   }


  return (
    <div>
      <h1>Weather App</h1>
      <input 
         type = "text"
         placeholder = "Enter city name"
         value = {city}
         onChange = {(event) => setCity(event.target.value)}
      />

      <button onClick = {getWeather}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition:{weather.weather[0].description}</p>
          <p>Wind speed:{weather.wind.speed} m/s</p>
        </div>
        
      )}

    </div>
  )
}

export default App;