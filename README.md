# World News Search

## Overview

This application is a news aggregator, allowing users to find various news about a country of their choice. This application will provide the user with various recent news articles about their selected country, accompanied with some information about that country, such as their flag, capital city, continent, currency, language spoken and a map.
This also saves the users previous searches and allows the user quick access to re-search for news about these countries.

This application was created using:
* HTML
* CSS
* JavaScript
* Bootstrap v5.2
* Server-side APIs
* Client-side storage

## Description

This application runs with the use of two server-side APis to retrieve various data. These APIs are:
* RESTcountries API
* GNews API

The application starts with a dropdown menu, allowing users to select their chosen country. This dropdown list includes a vast amount and allows users to type of find their desired choice faster.

Following this, a section about the country selected is generated using the RESTcountries API. By gathering and displaying the data provided to by this API we are able to show the capital city, continent, the currency (including abbreviation and symbol) and a list of the official national spoken languages. Also included is a button to access a google map of the country, using a bootstrap modal to provide a better experience.

The next section provides the various news articles generated from the GNews APi with a search parameter of the country's name. These news articles are displayed as bootstrap card and they include the main image of the article, the title of the article, a description of the content of the article and also provides a button to open the article on another tab.

At the bottom of the application, a search history is recorded. Allowing the user to see a record of their previous searches which are saved on their local storage, and provide fast access to re-search that country and generate news articles about it.

Please find below screenshots of the application:

#### Application:
![alt text](./assets/images/127.0.0.1_5500_index.html%20(4).png)

#### Application Wireframe:
![image](./assets/images/wireframe.png)

## Credits

Use of RESTcountries API - https://restcountries.com/  
Use of GNews API - https://gnews.io/ 

## Collaborators
This projects was built by:
* [Shaiza Iqbal](https://github.com/shaizai1)
* [Zee Mudia](https://github.com/iosazee)
* [Mike Davies](https://github.com/welsh-bloke)
* [Alex Ainslie](https://github.com/AlexAins)

## Deployed Application
Link to deployed application: https://shaizai1.github.io/World-News-Search/ 