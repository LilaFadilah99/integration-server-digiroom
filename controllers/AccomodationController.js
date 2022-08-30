const { Accommodation, History, User } = require("../models");

class AccomodationController {
  static async getAccomodation(request, response, next) {
    try {
      let accomodation = await Accommodation.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (accomodation.length === 0) throw { message: "Data Empty", status: 400 };
      response.status(201).json(accomodation);
    } catch (error) {
      next(error);
    }
  }
  static async addAccomodation(request, response, next) {
    const { name, imgUrl, description, roomCapacity, price, serviceCharge, location, UserId } = request.body;
    let updatedBy = request.user.email;
    try {
      let accomodation = await Accommodation.create({
        name,
        imgUrl,
        description,
        roomCapacity,
        price,
        serviceCharge,
        location,
        UserId,
      });
      let historyDescription = `Accommodation with id ${accomodation.id} created`;
      let history = await History.create({ name, description: historyDescription, updatedBy });
      response.status(201).json(accomodation);
    } catch (error) {
      next(error);
    }
  }
  static async editAccomodation(request, response, next) {
    let { id } = request.params;
    const { name, imgUrl, description, roomCapacity, price, serviceCharge, location } = request.body;
    let updatedBy = request.user.email;
    try {
      let [accomodation, returning] = await Accommodation.update({ name, imgUrl, description, roomCapacity, price, serviceCharge, location }, { where: { id: id }, returning: true });
      console.log(accomodation);
      if (accomodation === 0) throw { message: "Data Not Found", status: 404 };

      let historyDescription = `Accommodation with id ${id} updated`;
      let history = await History.create({ name, description: historyDescription, updatedBy });

      response.status(200).json(returning);
    } catch (error) {
      next(error);
    }
  }
  static async getAccomodationById(request, response, next) {
    let { id } = request.params;
    let updatedBy = request.user.email;
    try {
      let accomodation = await Accommodation.findByPk(id);
      if (!accomodation) throw { message: "Data Not Found", status: 404 };
      response.status(200).json(accomodation);
    } catch (error) {
      next(error);
    }
  }
  static async deleteAccomodation(request, response, next) {
    let { id } = request.params;
    let updatedBy = request.user.email;
    try {
      let getaccomodation = await Accommodation.findOne({ where: { id: id } });
      console.log(getaccomodation);
      let accomodation = await Accommodation.destroy({ where: { id: id }, returning: true });
      if (!accomodation) throw { message: "Data Not Found", status: 404 };

      let historyDescription = `Accommodation with id ${id} permanently deleted`;
      let name = getaccomodation.name;
      let history = await History.create({ name, description: historyDescription, updatedBy });

      response.status(200).json(`succes to delete accomodation id ${id}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AccomodationController;
