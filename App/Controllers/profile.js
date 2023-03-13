const db = require("../Models");
const users = db.Users;

module.exports.getProfile = async (req, res) => {
    try{
        const user = await users.findAll();
        
        res.status(200).json((user));
    }catch(e){
        return res.status(500).json({error: "Database error while retrieving user!" }); 
    }
}