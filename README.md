# Personal Budget
> Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create transactions for each individual envelope.



## General Information
- The project is part of the Back-end Engineer Curriculum from Codecademy
- I undertook this project in order to solidify my knowledge about creating APIs and querying databases
- There are two different versions of this project. One is working with node-postgres and this one is working with Prisma to manage the database connection. The aim was to compare both technologies to decide which one I prefer to use in future projects



## Technologies Used
- Express 4.18.1
- Typescript 4.8.2
- Prisma 4.3.1
- swagger-jsdoc 6.2.5
- swagger-ui-express 4.5.0
- Supabase



## Features
- Retrieving envelopes (all and single)
- Creating envelopes
- Updating envelopes
- Deleting envelopes
- Transfering budgets from envelope to envelope



## Setup
The dependencies which are necessary to run this app can be found in the package.json file. Node needs to be installed on your system.

1. Clone the repo
2. Navigate to the project folder in the terminal and install the necessary NPM dependencies
```
npm install
```
3. Run the app typing
```
node index.js
```
in your terminal and visit localhost:3000 in your browser. To read the API documentation visit localhost:3000/api-docs in your browser.



## Learnings
- Building an application with Vite
- Designing an API from scratch
- Building an Node/Express application in TypeScript for type-safety (e.g., implementing types for request / response objects)
- Setting up Prisma (Model, Migration)
- Writing database queries using Prisma
- Error-Handling with Prisma / Typescript
- Setting up and using Swagger to create an API documentation



## Project Status
This project is basically finished. In the future I may build a front-end for it.



## Acknowledgements
- This project is part of the [Codecademy](https://www.codecademy.com) Back-end engineer curriculum.



