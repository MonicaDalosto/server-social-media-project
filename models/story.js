'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // `story belongsTo space`
      story.belongsTo(models.space, { foreignKey: 'spaceId' });
      // Favorite: many to many relations: story belongs to many user
      story.belongsToMany(models.user, {
        through: 'favorite',
        foreignKey: 'storyId'
      });
    }
  }
  story.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'story'
    }
  );
  return story;
};
