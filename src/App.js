import React,{useState} from "react";
import './App.css';


function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const WEATHER_API= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0ad3c80d78d7e159da171335e308a97d`

  
  const getWeather = (event) => {
    if(event.key === "ENTER") {
      fetch(WEATHER_API)
      .then(res=> res.json())
      .then(data => {
        console.log(data)
        setWeatherData(data)
      })
    }
  }

  const handleOnChange = (e) => {
    setCity(e.target.value)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    fetch(WEATHER_API)
    .then(res=> res.json())
    .then(data =>{
      setWeatherData(data)
    })
  }
  
  return (
    <div className="App">
      <div className="navbar-search">
        <form onSubmit={handleOnSubmit}>
          <input type="search" placeholder="Search city" value={city} onChange={handleOnChange} onKeyPress={getWeather}/>
        </form>
      </div>
      {typeof weatherData.main === "undefined" ? 
      (
        <div className="desc">
          <p>Welcome to the Weather app! Enter city</p>
        </div>
      ): (
          <div className="weather-info-main">
            
            <div className="weather-info-ust">
              <p id="name">{weatherData.name}</p>
              <h1> {Math.round(((weatherData.main.temp)-32)/1.800)}°C</h1>
              <span>{weatherData.weather[0].main}</span>
            </div>
            
          
            <div className="weather-info-alt">
              <div className="info1">
                <p> {Math.round((weatherData.main.feels_like -32)/1.800)}°C</p>
                <h3>Feels like</h3>
              </div>
              <div className="info1">
                <p>{weatherData.wind.speed} MPH</p>

                <h3> Winds Speed</h3>
              </div>
              <div className="info1">
                <p>{weatherData.main.humidity}%</p>
                <h3>Humidity</h3>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
