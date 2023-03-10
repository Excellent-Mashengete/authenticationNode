# Express JS - JWT Protected Routes

An Authentication server for expressjs rest api, it authenticate a user using json web token

## Prerequisites

- **Node & NPM**

    - `Node Js 16.17.0`
    - `npm 8.15.0`</li>
    
- **ExpressJS & Sequelize**
    - `Express JS 4.17.2`
    - `Sequelize 6.29.3`
    
 - **Text Editor of your choice** (N.B I am using [vscode](https://code.visualstudio.com/download))

N.B if you have not installed <strong>NodeJS </strong> on your machine please visit the [NodeJS Official Site.](https://https://nodejs.org/en/)  

N.B To get more help on the <strong>Express JS </strong> go check out the [express Overview and Command Reference](https://expressjs.com/en/5x/api.html) page.


N.B Visit <strong>Sequelize</strong> official website to learn more about sequelize for structuring the database without using a queries [Sequelize Official Site.](https://sequelize.org/)  

## Dependencies needed to run this project

```json
{
    "dependencies": {
        "bcrypt": "^5.0.1",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^15.0.0",
        "express": "^4.17.2",
        "jsonwebtoken": "^8.5.1",
        "sequelize": "^6.29.3",
        "sqlite3": "^5.1.4",
        "uuid": "^9.0.0"
    },

    "devDependencies": {
        "nodemon": "^2.0.21"
    }
}

```
## Project Setup

1. Clone this project to your desired directory
2. Install <strong>NodeJs</strong>
3. open the project and direct to the project
4. Run the of the following commands to install all the packages used to create this project
   - `npm install or yarn `
        
## Running the project

1. Make sure to add a .env file this is where you will save all your api keys and secrete keys
2. Navigate inside the your server directory
3. On your terminal run the following command
   - `node server.js`
4. Go to the browswer and enter
   - `http://localhost:8080/`
5. on the address bar to run the server


N.B Run `node server.js`. using this format the server won't automatically reload after doing changes
Instead install `npm i -D nodemon or yarn add -D nodemon` then Run Server `nodemon server.js` The server will automatically reload if you change any of the source files.


## API endpoint testing
Use postman or thunderclient to test your http request endpoints whether they are working or not 

To get more help on npm packages go check out (https://www.npmjs.com) page.


***`Excellent Mashengete Ⓒ Copyright 2023`***
