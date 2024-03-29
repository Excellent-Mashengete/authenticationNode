module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
        },
        avatar: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        verified: {
            type: Sequelize.BOOLEAN,
            default: false,
        }, 
        OTP_Pin: {
            type: Sequelize.NUMBER,
            allowNull: false
        }, 
        isLoogedIn:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
  
    return Users;
};