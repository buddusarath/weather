﻿# Weather Dashboard


A responsive and interactive weather dashboard built with React. This application allows users to search for weather information by city, view current weather conditions, and toggle between Celsius and Fahrenheit units. The app fetches real-time weather data from the OpenWeatherMap API and displays it in a visually appealing interface.

Features
Search by City: Enter a city name to fetch and display its current weather.

Real-Time Updates: Automatically refreshes weather data every 30 seconds.

Unit Conversion: Toggle between Celsius and Fahrenheit for temperature display.

Dynamic Weather Icons: Animated icons based on weather conditions (e.g., sun, clouds, rain, snow, thunderstorm).

Error Handling: Displays user-friendly error messages for invalid city names or API issues.

Persistent Search: Saves the last searched city in local storage for convenience.

Technologies Used
React: A JavaScript library for building user interfaces.

Context API: Used for state management to share weather data across components.

OpenWeatherMap API: Provides real-time weather data.

CSS Animations: Adds dynamic and engaging visual effects to weather icons.

Local Storage: Persists the last searched city for a better user experience.

Project Setup
Clone the Repository:

bash
Copy
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
Install Dependencies:

bash
Copy
npm install
Add API Key:

Sign up at OpenWeatherMap to get a free API key.

Replace the API_KEY variable in the WeatherProvider component with your API key.

Run the Application:

bash
Copy
npm start
The app will open in your browser at http://localhost:3000.

Usage
Search for a City:

Enter a city name in the search bar and click "Search" or press Enter.

The app will display the current weather conditions for the city.

Toggle Temperature Units:

Click the temperature unit button (°C or °F) to switch between Celsius and Fahrenheit.

View Weather Details:

The dashboard displays temperature, weather description, humidity, and wind speed.

Weather icons dynamically change based on the current conditions.

Approach to the Assignment
Component-Based Architecture:

The app is built using reusable React components (WeatherProvider, SearchInput, WeatherDisplay, WeatherIcon).

The WeatherProvider component manages global state using React's Context API, making it easy to share data across components.

API Integration:

The OpenWeatherMap API is used to fetch weather data. Error handling ensures a smooth user experience even if the API request fails.

User Experience:

The app includes features like persistent search (using local storage) and real-time updates (polling every 30 seconds) to enhance usability.

Animations and dynamic icons make the interface engaging and visually appealing.

Responsive Design:

The app is designed to work seamlessly on both desktop and mobile devices.

Styling:

Custom CSS is used for styling, with animations for weather icons and a gradient background for a modern look.
