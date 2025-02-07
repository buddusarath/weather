import React, { useState, useEffect, createContext, useContext } from 'react';
import './WeatherDashboard.css'; // We'll create this CSS file

// Weather Context
const WeatherContext = createContext();

// Weather Provider Component
// Weather Provider Component
const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState('celsius');
    const [city, setCity] = useState(localStorage.getItem('lastSearchedCity') || '');
  
    const API_KEY = '6d23dd0a94c20c293cb8c87950f5eda6';
  
    const fetchWeatherData = async (city) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          
        
        if (!response.ok) {
          throw new Error('City not found');
        }
        
        const data = await response.json();
        setWeatherData(data);
        setCity(city);
        localStorage.setItem('lastSearchedCity', city);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (city) {
        fetchWeatherData(city);
        const interval = setInterval(() => fetchWeatherData(city), 30000); // Polling every 30 seconds
        return () => clearInterval(interval);
      }
    }, [city]);
  
    const convertTemperature = (temp) => {
      return unit === 'celsius' 
        ? temp 
        : (temp * 9/5) + 32;
    };
  
    return (
      <WeatherContext.Provider value={{
        weatherData, 
        error, 
        loading, 
        fetchWeatherData, 
        unit,
        setUnit,
        convertTemperature
      }}>
        {children}
      </WeatherContext.Provider>
    );
  };
  

// Weather Icons Component
const WeatherIcon = ({ weatherType }) => {
  const getIconClass = (type) => {
    switch(type) {
      case 'Clear': return 'sun';
      case 'Clouds': return 'cloud';
      case 'Rain': return 'rain';
      case 'Snow': return 'snow';
      case 'Thunderstorm': return 'thunder';
      default: return 'cloud';
    }
  };

  return (
    <div className={`weather-icon ${getIconClass(weatherType)}`}>
  <div className="icon"></div>
</div>

  );
};

// Search Component
const SearchInput = () => {
  const [city, setCity] = useState('');
  const { fetchWeatherData } = useContext(WeatherContext);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <button 
        onClick={handleSearch} 
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};

// Weather Display Component
const WeatherDisplay = () => {
  const { 
    weatherData, 
    loading, 
    error, 
    unit, 
    setUnit, 
    convertTemperature 
  } = useContext(WeatherContext);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      {error}
    </div>
  );

  if (!weatherData) return null;

  const { 
    main, 
    wind, 
    weather,
    name
  } = weatherData;

  const currentWeather = weather[0];

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>{name}</h2>
        <button 
          onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
          className="unit-toggle"
        >
          {unit === 'celsius' ? '°C' : '°F'}
        </button>
      </div>
      
      <WeatherIcon weatherType={currentWeather.main} />
      
      <div className="weather-details">
        <div className="temperature">
          <span className="temp-value">
            {convertTemperature(main.temp).toFixed(1)}°{unit === 'celsius' ? 'C' : 'F'}
          </span>
          <span className="temp-description">{currentWeather.description}</span>
        </div>
        
        <div className="additional-info">
          <div>Humidity: {main.humidity}%</div>
          <div>Wind: {wind.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const WeatherDashboard = () => {
  return (
    <WeatherProvider>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Weather Dashboard</h1>
          <SearchInput />
          <WeatherDisplay />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default WeatherDashboard;