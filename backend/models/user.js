module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      imageUrl: DataTypes.STRING, 
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING, 
      isAdmin: DataTypes.BOOLEAN,
  });
  User.associate = function(models) {
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment)
  };
  return User;
};