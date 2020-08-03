'use strict';
module.exports = (sequelize, DataTypes) => {
const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    commentId: DataTypes.INTEGER
    });
Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post, { foreignKey: { allownull:false } });
    models.Comment.belongsTo(models.User, { foreignKey: { allownull:false } });
}
    return Comment;
}

 