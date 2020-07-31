'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId: DataTypes.INTEGER, 
        content: DataTypes.STRING,
    });
    Post.associate = function(models) {
      models.Post.belongsTo(models.User, {
      foreignKey: { allownull:false }
    })
    }
    return Post;
};

