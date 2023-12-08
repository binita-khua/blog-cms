module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Comment.associate = function(models) {
      // Associating Comment with User
      Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
  
      // Associating Comment with Post
      Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Comment;
  };
  