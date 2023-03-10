const express = require('express'); 
const app = express();
const cors = require('cors');
const corsOptions = require('./App/Configs/corsOptions');
const verifyJWT = require('./App/Middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./App/Middlewares/credentials');

const port = process.env.PORT || 8080;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

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

const register = require('./App/Routes/register')
const login = require('./App/Routes/login')

app.get('/', (req, res) =>{
    res.status(200).send('Sever Initialized and Online. Ready to take OFF!');
});

app.use('/api', register);
app.use('/api', login);

app.listen(port, () =>{
   console.log(`Server is running on port ${port}. http://localhost:${port}`) 
})
