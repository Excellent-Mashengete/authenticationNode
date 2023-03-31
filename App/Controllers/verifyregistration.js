const db = require("../Models");
const users = db.Users;
const Token = db.Token;
const Sequelize = db.Sequelize;

//Verify Email of registered user
module.exports.verifyUser = async (req, res) => {
    try{
        const {id, token } = req.params
        console.log(id, token);
        //CHeck if token and id exist in database
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
            return res.status(400).json({message:"Invalid link"});
        }else{
            //update registered user to verified
            await users.update({verified: true},{ 
                where: { 
                    id: userToken.dataValues.id
                }
            });

            //remove the user from the database
            await userToken.destroy();
            
            res.redirect('http://localhost:3000/auth/login')
            // return res.status(202).send('http://localhost:3000/auth/login');
        }
    }catch(e) {
        res.status(500).json({message: "Database error while verifying user!" });
    } 
}