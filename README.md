# Weather-Dashboard
5 Day Weather Forecast to display weather data for cities

## Features:
In this project, I coded an weather dashboard app with the following features:

- User can input the name of the city that they would like to obtain the weather infomation
- The app fetches the weather data from openweathermap API. 
- 3 Queries were needed
    1) Query to get the latitude and longtitude coordinates data from the City name 
    2) Query to get the current weather data (latitude and longtitude input from 1) needed)
    3) Query to get the 5 day forecasr data (latitude and longtitude input from 1) needed)
- For the input city, the dashboard displays the following data for the current weather as well as the 5 day forecast: 
    - the weather icon
    - temperature
    - wind
    - humidity
- The searched City is then displayed on search history list below the search button
- The search history list is stored using LocalStorage


## Future development: 
- I would like to further amend the script to make it screen-size adaptive so it displays 1 card per line on small screen.
- Further logics can be added to make sure the input from user is City.


## Example:
![Weather-Dashboard](./assets/Weather-dashboard.jpg)

## Deployed link
https://prangchira.github.io/Weather-Dashboard/


## Credit:
I would like to thank Tutor Samuel Cordova for helping me on CSS styling on the page layout.

## Licenses
MIT License

Copyright (c) 2023 prangchira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.