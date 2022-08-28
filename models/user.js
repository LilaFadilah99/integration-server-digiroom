"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Model.hasMany(models.Accommodation, { foreignKey: "UserId" });
      Model.hasMany(models.Account, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name cannot null",
          },
          notEmpty: {
            args: true,
            msg: "name cannot empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "email cannot null",
          },
          notEmpty: {
            args: true,
            msg: "email cannot empty",
          },
          isEmail: {
            args: true,
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "password cannot null",
          },
          notEmpty: {
            args: true,
            msg: "password cannot empty",
          },
          checkPasswordLength(value) {
            if (value.length < 5) {
              throw new Error("minimum password length is 5");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "role cannot null",
          },
          notEmpty: {
            args: true,
            msg: "role cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
