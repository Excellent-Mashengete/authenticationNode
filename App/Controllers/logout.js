const db = require("../Models");
const users = db.Users;
const Sequelize = db.Sequelize;

module.exports.logout = async (req, res) => {
    const id = req.userId;
    try{
        await users.update({ isLoogedIn: false },{ 
            where: { 
                id: id
            }
        })

        return res.status(200).send({ message: "You've been signed out!" });
    }catch(e) {
        return res.status(500).json({error: "Database error while logging out user!" });
    }
}