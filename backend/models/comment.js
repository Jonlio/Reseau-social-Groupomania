'use strict';
module.exports = (sequelize, DataTypes) => {
const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    commentId: DataTypes.INTEGER
    });
Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post, { foreignKey: models.Post.postId });
    models.Comment.belongsTo(models.User, { foreignKey: models.User.userId });
}
    return Comment;
}

