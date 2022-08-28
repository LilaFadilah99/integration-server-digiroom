"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accommodation.belongsTo(models.User, { foreignKey: "UserId" });
      Accommodation.hasMany(models.AccommodationFacility, { foreignKey: "AccommodationId" });
    }
  }
  Accommodation.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name cannot null",
          },
          notEmpty: {
            args: true,
            msg: "Name cannot empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Description cannot null",
          },
          notEmpty: {
            args: true,
            msg: "Description cannot empty",
          },
        },
      },
      roomCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Room Capacity cannot null",
          },
          notEmpty: {
            args: true,
            msg: "Room Capacity cannot empty",
          },
          min: {
            args: 20000,
            msg: "Minimum Room Capacity is 20000",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "price cannot null",
          },
          notEmpty: {
            args: true,
            msg: "price cannot empty",
          },
          min: {
            args: 20000,
            msg: "Minimum price is 20000",
          },
        },
      },
      serviceCharge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Service Charge cannot null",
          },
          notEmpty: {
            args: true,
            msg: "Service Charge cannot empty",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "User cannot null",
          },
          notEmpty: {
            args: true,
            msg: "User cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Accommodation",
    }
  );
  return Accommodation;
};
