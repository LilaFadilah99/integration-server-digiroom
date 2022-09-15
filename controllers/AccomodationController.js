const { Accommodation, History, User, Favorite } = require("../models");

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
      console.log(error);
      next(error);
    }
  }
  static async getAccomodationById(request, response, next) {
    let { id } = request.params;
    // let updatedBy = request.user.email;
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

  static async editStatusAccomodation(request, response, next) {
    const { id } = request.params;
    let { status } = request.body;
    let updatedBy = request.user.email;
    try {
      let getaccomodation = await Accommodation.findByPk(id);
      let [accomodation, returning] = await Accommodation.update({ status }, { where: { id: id }, returning: true });
      if (accomodation === 0) throw { message: "Data Not Found", status: 404 };

      let beforeStatus = getaccomodation.status;
      let afterStatus = returning[0].status;
      let historyDescription = `Accommodation with id ${id} status has been updated from ${beforeStatus} to ${afterStatus}`;
      let name = getaccomodation.name;
      let history = await History.create({ name, description: historyDescription, updatedBy });

      response.status(200).json(returning[0]);
    } catch (error) {
      next(error);
    }
  }

  // post favorite
  static async addDataFavorites(request, response, next) {
    let { id } = request.params;
    let UserId = request.user.id;
    try {
      const accomodation = await Accommodation.findOne({ where: { id: id } });
      if (!accomodation) throw { name: "NotFound" };

      const favorite = await Favorite.findOne({ where: { UserId: UserId, AccomodationId: id } });
      if (favorite) throw { message: "Favorite data has been added", status: 400 };

      const addFavorite = await Favorite.create({ UserId, AccomodationId: id });
      response.status(201).json(addFavorite);
    } catch (error) {
      next(error);
    }
  }

  // get favorite
  static async getDataFavorites(request, response, next) {
    const { id, role } = request.user;
    console.log(id);
    try {
      if (role !== "customer") throw { message: "only customer can get the data", status: 400 };
      const favorite = await Favorite.findAll({ where: { UserId: id }, include: [Accommodation, User], order: [["updatedAt", "DESC"]] });
      console.log(favorite);
      if (!favorite) throw { name: "NotFound" };
      response.status(200).json(favorite);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDataFavorite(request, response, next) {
    let { id } = request.params;
    let UserId = request.user.id;

    try {
      const favorite = await Favorite.destroy({ where: { UserId: UserId, AccomodationId: id } });
      if (!favorite) throw { name: "NotFound" };

      response.status(200).json(`Success delete favorite`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AccomodationController;
