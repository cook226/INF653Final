Final Project - REST API with Node.js, Express, and MongoDB
Project Overview

This project showcases a RESTful API built using Node.js, Express, and MongoDB. It integrates a statesData.json file as a data source while utilizing MongoDB to store and manage additional data like fun facts about each state. Automated testing ensures the reliability and performance of the API.

Features:
    - CRUD Operations: Offers complete Create, Read, Update, and Delete functionalities for states and their associated data.
    - State Information: Retrieves information like state capital, population, and admission details.
    - Random Fun Facts: Provides random fun facts about states, stored in MongoDB.
    - Data Validation: Includes middleware to validate state abbreviations across endpoints.
    - Automated Tests: Comprehensive automated tests verify API functionality.

Project Links
    - GitHub Repository: https://github.com/cook226/INF653Final
    - Deployed Project: https://inf653final-op1w.onrender.com

Challenges and Learnings
    - Handling JSON Data: Reading and manipulating data from statesData.json required proper file handling and validation.
    - CORS Configuration: Adjusting Cross-Origin Resource Sharing (CORS) settings was crucial to support testing tools and the automated testing web app.
    - Middleware Implementation: Developing reusable middleware for state validation streamlined API routes and reduced code duplication.
    - Automated Testing: Writing comprehensive automated tests for each endpoint improved reliability and ensured edge cases were covered.

API Endpoints

State Information
    - GET /states/: Retrieves all states or filters by contiguous/non-contiguous using the contig query parameter.
    - GET /states/:state: Returns details for a specific state, including fun facts from MongoDB.
    - GET /states/:state/funfact: Fetches a random fun fact about a specific state.

Additional Details
    - GET /states/:state/capital: Returns the capital city of a state.
    - GET /states/:state/nickname: Returns the nickname of a state.
    - GET /states/:state/population: Returns the population of a state.
    - GET /states/:state/admission: Returns the admission date of a state.

CRUD Operations for Fun Facts
    - POST /states/:state/funfact: Adds fun facts to the database for a state.
    - PATCH /states/:state/funfact: Updates a specific fun fact by index.
    - DELETE /states/:state/funfact: Removes a specific fun fact by index.

Automated Testing
    - Testing Tools: Postman, ThunderClient (VS Code Extension)
    - Coverage: Tests cover all API endpoints and verify that expected responses align with the requirements.

Environment Setup
Clone Repository:
    - git clone [Your GitHub Repo URL]
    - cd [Repository Name]

Install Dependencies:
    - npm install

Configure Environment Variables:
    - Create a .env file in the root directory.
    - Add the MongoDB connection string in this format:
        - DATABASE_URI=mongodb+srv://YOUR_MONGO_USERNAME:YOUR_MONGO_PASSWORD@cluster0.mongodb.net/states?retryWrites=true&w=majority
Run Server:
    - npm start