module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Post.associate = function(models) {
      // Associating Post with User
      // A Post can't be created without a User due to the foreign key constraint
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };
  