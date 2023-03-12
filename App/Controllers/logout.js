const db = require("../Models");
const users = db.Users;

module.exports.logout = async (req, res) => {
    const {cookies} = req.body;
    try{
        console.log(cookies);
        if (!cookies) 
            return res.status(204);

        // Is refreshToken in db?
        const user = await users.findOne({ 
            where: { 
                refreshToken: cookies 
            } 
        });

        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.status(400).json({ error: "token does not exist, login first" });
        }else{
            await users.update({ refreshToken: null }, {
                where: {
                    email: user.email
                }
            });

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.status(204).json({ error: `${user.firstname} Successfully logged out` });
        }
    }catch(e) {
        return res.status(500).json({error: "Database error while logging out user!" });
    }
}