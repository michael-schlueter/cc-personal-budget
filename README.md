# Personal Budget
> Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create transactions for each individual envelope.



## General Information
- The project is part of the Back-end Engineer Curriculum from Codecademy
- I undertook this project in order to solidify my knowledge about creating APIs
- Furthermore I wanted to try creating an Node application using Vite in combination with Nodemon and Concurrently and get a feel for the developer experience doing so
- Additional to the demands of the project itself, I challenged myself to build a Node/Express application with TypeScript for type-safety



## Technologies Used
- express 4.18.1
- Typescript 4.8.2
- Nodemon 2.0.19
- Concurrently 7.3.0



## Features
- Retrieving envelopes (all and single)
- Creating envelopes
- Updating envelopes
- Deleting envelopes
- Transfering budgets from envelope to envelope



## Setup
The dependencies which are necessary to run this app can be found in the package.json file.

1. Clone the repo
2. Navigate to the project folder in the terminal and install the necessary NPM dependencies
```
npm install
```
3. Run the app typing
```
npm run dev
```
in your terminal and visit localhost:3000 in your browser.



## Learnings
- Building an application with Vite
- Designing an API from scratch
- Building an Node/Express application in TypeScript for type-safety (e.g., implementing types for request / response objects)
- Importance of data validation



## Project Status
This project will be enhanced in a future Codecademy challenge project where the aim will be to integrate a database for the data to persist. In this version of the project I plan to use Prisma in combination with a PostgreSQL database because I already worked with TypeScript in this project. There is another version of this project where I use plain JavaScript and node-postgres to integrate a PostgreSQL database. I want to get a better understanding for the trade-offs using one over the other. Additionally I may build a frontend to display the envelopes and budgets and to provide CRUD functionality.



## Acknowledgements
- This project is part of the [Codecademy](https://www.codecademy.com) Back-end engineer curriculum.



