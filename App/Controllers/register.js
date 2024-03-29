const { sendEmail } = require("../Utils/email");
const { OTPPin } = require("../Utils/createOTP");
const db = require("../Models");
const bcrypt = require('bcrypt');
const users = db.Users;
const Token = db.Token;
const jwt = require('jsonwebtoken');

//Register a new user
module.exports.register = async (req, res) => {
    const {username, firstname,  lastname, email, phone, avatar, password } = req.body

    try {  
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(400).json({ message: "unable to protect password" });
            
            const registeredUser = await users.create({
                firstname: firstname, lastname: lastname,
                username: username, email:email, phone:phone,
                OTP_Pin:OTPPin(), avatar: avatar, password: hash
            });
            
            //Create a token key for user to receive as an email nortification
            const accessToken = jwt.sign({ 
                    "id": registeredUser.dataValues.id
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30d' }
            );

            //Add the token key and a foreign key to the the token table
            await Token.create({
                user_id: registeredUser.dataValues.id,
                token: accessToken
            });

            const message = `http://localhost:8080/api/user/verify/${registeredUser.dataValues.id}/${accessToken}`;
            
            //Send an email notification to verify a user email
            await sendEmail(registeredUser.dataValues.email, "Verify Email", message);

            return res.status(201).json({message: 'An Email has been sent to your account please verify' });
        })
    }catch(e) {
        res.status(500).json({message: "Database error while registring user!" });
    }
}
