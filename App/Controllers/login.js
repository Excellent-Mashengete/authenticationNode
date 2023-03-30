const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../Models");
const users = db.Users;
const Sequelize = db.Sequelize;
const { sendEmail } = require("../Utils/email");

//Create an OTP Pin for verifying uppon login
function OTPPin(){
    let otp_pin;
    for (let i = 0; i <4 ; i++) {
        let randomNum = parseInt(1000 + Math.random() * (9000 - 1000))
        otp_pin = randomNum;
    }
    return otp_pin;
}

module.exports.login = async (req, res) => {
    const { identifier, password } = req.body
    if(!identifier || !password ) 
        return res.status(400).json({ message: 'email/Username and password are required.' });

    try{
        const user = await users.findOne({
            where:{ 
                [Sequelize.Op.or]: [{
                    username: identifier
                    },
                    {
                        email: identifier
                    }
                ]
            }
        });

        if (!user) {
            return res.status(400).json({ message: "user does not exists" })
        }
        else{
            const verified = await user.dataValues.verified
            if(!verified){
                return res.status(400).json({ message: "Please verify your email before you can login" });
            }else{
                bcrypt.compare(password, user.password, async (err, result) => {
                    if(err) {
                        return res.status(400).json({ message: "Unable to compare hashed password" });
                    } else if (result === true){ 

                        const header = "To verify your email address, please use the following One Time Password(OTP) \n";
                        const body = `OTP PIN: ${user.dataValues.OTP_Pin}`;
                        const footer = "\n Do not share this OTP with others";
                        const message = header +'\n' + body + '\n' + footer + '\n' + "\n Thank you!";

                        await sendEmail(user.dataValues.email, "Verify your candidate account", message);
                        
                        return res.status(200).json({ message: "Check your emails for OTP PIN" });
                    }else{
                        return res.status(400).json({ message: "Incorrect password" });
                    }
                })
            }
        }
    }catch(e) {
        res.status(500).json({message: "Database error while registring user!" });
    }
}

module.exports.VerifyOTP = async (req, res) => {
    const { OTP, email } = req.body
    if(!OTP) return res.status(400).json({ message: 'OTP is required.' });
    
    try{
        const user = await users.findOne({
            where: {
                [Sequelize.Op.and]: [{
                        email: email
                    },
                    {
                        OTP_Pin: OTP
                    }
                ]
            }
        })

        if(!user){ 
            return res.status(404).json({ message: 'Invalid OTP'})
        }else{
            console.log(OTPPin() );
            await users.update({
                isLoogedIn: true,
                OTP_Pin: OTPPin() 
            }, {
                where: {
                    email: user.dataValues.email
                }
            });
            
            const accessToken = jwt.sign({ 
                    "id": user.dataValues.id
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '86400' }
            );


            return res.json({ email: user.dataValues.email, name: user.dataValues.firstname + " " + user.dataValues.lastname, token :accessToken });
        }
    }catch(e) {
        res.status(500).json({message: "Database error while registring user!" });
    }
}