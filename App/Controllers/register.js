const db = require("../Models");
const bcrypt = require('bcrypt');
const users = db.Users;

module.exports.register = async (req, res) => {
    const {firstname, lastname, email, phone, avatar, password } = req.body
    if(!firstname || !lastname || !email || !phone || !avatar || !password ) 
        return res.status(400).json({ 'message': 'Please fill in the form.' });

    try {  
        const user = await users.findOne({ where: { email: email} });

        if (user) {
            res.status(400).json({ error: "User exists" });
        }else{
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(400).json({ error: "unable to protect password" });
                }
                
                const newUser = await users.create({
                    firstname: firstname, lastname: lastname,
                    email:email, phone:phone, avatar: avatar, 
                    password: hash});
                
                return res.json({message: 'User registered successfully', newUser });
            })
        }
    }catch(e) {
        res.status(500).json({error: "Database error while registring user!" });
    }
}