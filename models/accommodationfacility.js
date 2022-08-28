"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccommodationFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccommodationFacility.belongsTo(models.Accommodation, { foreignKey: "AccommodationId" });
      AccommodationFacility.belongsTo(models.Facility, { foreignKey: "FacilityId" });
    }
  }
  AccommodationFacility.init(
    {
      AccommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Accommodation cannot null",
          },
          notEmpty: {
            args: true,
            msg: "Accommodation cannot empty",
          },
        },
      },
      FacilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Facility cannot null",
          },
          notEmpty: {
            args: true,
            msg: "Facility cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AccommodationFacility",
    }
  );
  return AccommodationFacility;
};
