const db = require("../Models");
const users = db.Users;
const { Sequelize } = db.sequelize
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports.login = async (req, res) => {
    const {email, password } = req.body
    if(!email || !password ) 
        return res.status(400).json({ 'message': 'Username and password are required.' });

    try{
        const user = await users.findOne({where:{ email: email }});
       
        if (!user) {
            return res.status(400).json({ error: "user does not exists" })
        }else{
            bcrypt.compare(password, user.password, async (err, result) => {
                if(err) {
                    return res.status(400).json({ error: "Unable to compare hashed password" });
                } else if (result === true){ 
                    const accessToken = jwt.sign({ 
                            "username": user.email
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                    );

                    const refreshToken = jwt.sign({
                            "username": user.email
                        },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );

                    // Saving refreshToken with current user 
                    await users.update({ refreshToken: refreshToken }, {
                        where: {
                            email: user.email
                        }
                    });
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                    res.json({ accessToken });
                }
            })
        }
    }catch(e) {
        res.status(500).json({error: "Database error while registring user!" });
    }
}