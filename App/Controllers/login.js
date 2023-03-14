const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../Models");
const users = db.Users;
const Sequelize = db.Sequelize;

module.exports.login = async (req, res) => {
    const { identifier, password } = req.body
    if(!identifier || !password ) 
        return res.status(400).json({ 'message': 'email/Username and password are required.' });

    try{
        const user = await users.findOne({
            where:{
                [Sequelize.Op.or]: [{
                    username: identifier
                },
                {
                    email: identifier
                }]
            }
        });

        if (!user) {
            return res.status(400).json({ message: "user does not exists" })
        }else{
            bcrypt.compare(password, user.password, async (err, result) => {
                if(err) {
                    return res.status(400).json({ message: "Unable to compare hashed password" });
                } else if (result === true){ 
                    const accessToken = jwt.sign({ 
                            "id": user.id
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '86400' }
                    );

                    // change islooge to true
                    await users.update({ isLoogedIn: true }, {
                        where: {
                            email: user.email
                        }
                    });
                    
                    return res.json({ email: user.email, name: user.firstname + " " + user.lastname, token :accessToken });
                }else{
                    return res.status(400).json({ message: "Incorrect password" });
                }
            })
        }
    }catch(e) {
        res.status(500).json({message: "Database error while registring user!" });
    }
}