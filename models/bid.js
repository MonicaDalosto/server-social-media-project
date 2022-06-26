'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // bid belongsto user
      bid.belongsTo(models.user, { foreignKey: 'userId' });
      // bid belongsto story
      bid.belongsTo(models.story, { foreignKey: 'storyId' });
    }
  }
  bid.init(
    {
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'bid'
    }
  );
  return bid;
};
