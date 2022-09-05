# X-Weather

X-weather is a responsive weather app developed with React, typescript and [ openweathermap](https://openweathermap.org/) APi.

## Technologies Used

1. React
2. Typescript
3. OpenweatherMap API
4. gsap

## Project Objective

the main goal of this project is to create an responsive and user friendly app that allow users to get the current foreceast of any city in the world by simply providing the name of the city

## Problems & solutution

1. Getting the users current location (city name) and displaying the current weather forecast for that city

   #### solution

   - I used the javacript navigation api to get the user coordinates
   - extracted the longitude and latitude from the retured data
   - used the openweatherMap api to fetch the current weather forecase bases on the users longitude and latitude

2. Getting the current weather forecast of the city searched by the user

   #### solution

   - I passed the user input to the Geocoding API provided by openweather map which returned the latitued and longitude of the city
   - extracted the longitude and latitude from the retured data
   - used the openweatherMap api to fetch the current weather forecase of the city searhed by the user
