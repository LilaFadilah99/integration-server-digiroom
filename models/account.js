"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Account.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: DataTypes.INTEGER,
      phoneNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      emergencyContack: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
