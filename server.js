const express = require('express'); 
const app = express();
const cors = require('cors');
const bodyparser = require("body-parser");
const corsOptions = require('./App/Configs/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./App/Middlewares/credentials');

const port = process.env.PORT || 8080;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
// Cross Origin Resource Sharing
app.use(cors(origin="http://localhost:3000"));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// app.use(verifyJWT);

const db = require('./App/Models/');

db.sequelize.authenticate({force: false })
   .then(() => {
      console.log("Database is connected");
   }).catch((err) => {
      console.log("Failed to connect to DB: ", err);
   })

const register = require('./App/Routes/register');
const login = require('./App/Routes/login');
const logout = require('./App/Routes/logout');

app.get('/', (req, res) =>{
    res.status(200).send('Sever Initialized and Online. Ready to take OFF!');
});

app.use('/api', register);
app.use('/api', login);
app.use('/api', logout);

app.listen(port, () =>{
   console.log(`Server is running on port ${port}.`) 
})
