const db = require("../Models");
const bcrypt = require('bcrypt');
const users = db.Users;

module.exports.register = async (req, res) => {
    const {username, firstname,  lastname, email, phone, avatar, password } = req.body

    try {  
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(400).json({ error: "unable to protect password" });    
            
            await users.create({
                firstname: firstname, lastname: lastname,
                username: username, email:email, phone:phone,
                avatar: avatar, password: hash});
            
            return res.json({message: 'User registered successfully',  });
        })
    }catch(e) {
        res.status(500).json({error: "Database error while registring user!" });
    }
}