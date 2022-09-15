const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(request, response, next) {
    try {
      let { username, email, password } = request.body;
      let role = "customer";

      let user = await User.create({ username, email, password, role });

      response.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(request, response, next) {
    let { email, password } = request.body;

    try {
      if (!email || !password) throw { message: "Email and password is required", status: 400 };

      let user = await User.findOne({ where: { email } });
      if (!user || !checkPassword(password, user.password)) throw { status: 400, message: "Invalid email/password" };

      let access_token = signToken({ id: user.id, email: user.email });
      response.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getUser(request, response, next) {
    try {
      let user = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async getUserById(request, response, next) {
    let { id } = request.params;
    try {
      let user = await User.findOne({
        where: { id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      if (!user) throw { message: "Data Not Found", status: 404 };
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(request, response, next) {
    try {
      let { id } = request.params;
      let { username, email, password, role } = request.body;
      let [user, returnData] = await User.update({ username, email, password, role }, { where: { id: id }, returning: ["username", "email", "role"] });
      console.log(user);
      response.status(200).json(returnData);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(request, response, next) {
    let { id } = request.params;
    try {
      let user = await User.destroy({ where: { id: id } });
      if (!user) throw { message: "Data Not Found", status: 404 };
      response.status(200).json(`succes to delete user id ${id}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
