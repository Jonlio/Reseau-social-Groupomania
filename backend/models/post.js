'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  });
  Post.associate = function(models) {
    models.Post.belongsTo(models.User, {
    foreignKey: { allownull: false }
  });
  models.Post.hasMany(models.Comment)
  }
  return Post;
}
