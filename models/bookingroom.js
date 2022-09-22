"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingRoom.belongsTo(models.Accommodation, { foreignKey: "AccomodationId" });
      BookingRoom.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  BookingRoom.init(
    {
      checkin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "checkin date cannot null",
          },
          notEmpty: {
            args: true,
            msg: "checkin date cannot empty",
          },
        },
      },
      checkout: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "checkout date cannot null",
          },
          notEmpty: {
            args: true,
            msg: "checkout date cannot empty",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "total price cannot null",
          },
          notEmpty: {
            args: true,
            msg: "total price cannot empty",
          },
        },
      },
      totalNight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "total night cannot null",
          },
          notEmpty: {
            args: true,
            msg: "total night cannot empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "unpaid",
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "status cannot null",
          },
          notEmpty: {
            args: true,
            msg: "status cannot empty",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "UserId cannot null",
          },
          notEmpty: {
            args: true,
            msg: "UserId cannot empty",
          },
        },
      },
      AccomodationId: {
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
    },
    {
      sequelize,
      modelName: "BookingRoom",
    }
  );
  return BookingRoom;
};
