module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
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
            unique: true,
            allowNull: false
        },
        avatar: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.STRING,
        },  
        refreshToken:{
            type: Sequelize.STRING
        }
    });
  
    return Users;
};