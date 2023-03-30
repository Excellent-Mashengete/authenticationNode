const db = require("../Models");
const users = db.Users;
const Token = db.Token;
const Sequelize = db.Sequelize;

//Verify Email of registered user
module.exports.verifyUser = async (req, res) => {
    try{
        const {id, token } = req.params

        const userToken = await Token.findOne({
            where:{
                [Sequelize.Op.and]: [{
                        user_id:id
                    },
                    {  
                        token: token
                    }
                ]
            }
        });

        if(!userToken){
            return res.status(400).send("Invalid link");
        }else{
            await users.update({verified: true},{ 
                where: { 
                    id: userToken.dataValues.id
                }
            });

            await userToken.destroy();
            
            return res.send("email verified sucessfully");
        }
    }catch(e) {
        res.status(500).json({error: "Database error while registring user!" });
    } 
}