const { sendEmail } = require("../Utils/email");
const db = require("../Models");
const bcrypt = require('bcrypt');
const users = db.Users;
const Token = db.Token;
const jwt = require('jsonwebtoken');

//Create an OTP Pin for verifying uppon login
function OTP(){
    let otp_pin;
    for (let i = 0; i <4 ; i++) {
        let randomNum = parseInt(1000 + Math.random() * (9000 - 1000))
        otp_pin = randomNum;
    }
    return otp_pin;
}

//Register a new user
module.exports.register = async (req, res) => {
    const {username, firstname,  lastname, email, phone, avatar, password } = req.body

    try {  
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(400).json({ error: "unable to protect password" });

            console.log(OTP());
            
            const registeredUser = await users.create({
                firstname: firstname, lastname: lastname,
                username: username, email:email, phone:phone,
                OTP_Pin:OTP(), avatar: avatar, password: hash
            });
            
            const accessToken = jwt.sign({ 
                    "id": registeredUser.dataValues.id
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30d' }
            );

            await Token.create({
                user_id: registeredUser.dataValues.id,
                token: accessToken
            });

            const message = `http://localhost:8080/api/user/verify/${registeredUser.dataValues.id}/${accessToken}`;
 
            await sendEmail(registeredUser.dataValues.email, "Verify Email", message);

            return res.json({message: 'An Email has been sent to your account please verify' });
        })
    }catch(e) {
        res.status(500).json({error: "Database error while registring user!" });
    }
}
