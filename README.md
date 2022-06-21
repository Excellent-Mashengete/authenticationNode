# Backend

This project was generated with [NodeJS]

## Development server

Run `node server.js`. using this format the server won't automatically reload after doing changes
Instead install `npm i nodemon` then Run Server `nodemon server.js` The server will automatically reload if you change any of the source files.

## Dependencies needed to run this project

Look at the package.json file where you will be able to see the exact packages installed when creating this server, bare in mind the versions of all 
packages installed. 

## Server for 

It is a backend server that uses nodejs to register and do logins using javascript, it stored the data in a database (used postgresql) it also encrypt
tbe passwords when storing them in the database, for security purposes the app has a token key generated so that each client cannot ue the api endpoints 
to manipulate your database. 

## API endpoint testing
Use postman or thunderclient to test your http request endpoints whether they are working or not 

To get more help on the express go check out the [express Overview and Command Reference](https://expressjs.com/en/5x/api.html) page.
To get more help on npm packages go check out (https://www.npmjs.com) page.
