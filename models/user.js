module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: DataTypes.STRING,
      password: DataTypes.STRING, // Hashed password
    });
  
    return User;
  };
  