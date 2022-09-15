"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.Accommodation, { foreignKey: "AccomodationId" });
      Favorite.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Favorite.init(
    {
      UserId: DataTypes.INTEGER,
      AccomodationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
