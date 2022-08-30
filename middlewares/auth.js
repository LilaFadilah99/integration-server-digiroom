const { decodeToken } = require("../helpers/jwt");
const { User, Accommodation } = require("../models");

module.exports = {
  authentication: async (request, response, next) => {
    try {
      // token yg di dapat dari inputan headers
      let token = request.headers.access_token;
      // jika token tidak diisi makan akan muncul pesan error
      if (!token) throw { message: "NotAuthenticated", status: 401 };
      //   token membawa data berupa id, username dan email. sehinngga dapat digunakan untuk menemukan user di database
      let { id } = decodeToken(token);
      let user = await User.findByPk(id);
      //   jika id tidak sesuai dengan satupun data dari database maka akan muncul pesan error
      if (!user) throw { message: "NotAuthenticated", status: 401 };
      //   menambah satu key baru yaitu "user" ke request sehingga nanti datanya dapat diolah dan digunakan di tempat lain
      request.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      //   jika proses authentication berhasil maka boleh lanjut ke route yg mengarah ke controller
      next();
    } catch (error) {
      next(error);
    }
  },

  authorization: async (request, response, next) => {
    try {
      if (request.user.role === "admin") {
        next();
      } else {
        // id ditangkap dari params dimana middleware authorization dipasang
        const { id } = request.params;
        // id yg ditangkap dari param digunakan untuk mencari user di database
        const user = await User.findByPk(id);
        //   jika user di database tidak ditemukan maka tampilkan pesan error
        if (!user) throw { message: "Data Not Found", status: 404 };
        //   setelah user di database berhasil ditemukan maka akan di cek terlebih dahulu, apakah UserId dari user yang ingin mengakses data tsb sama dengan request.user.id dari proses login di awal alias, apakah benar data yang di akses adalah miliknya. jika bukan maka dia tidak memiliki akses ke data tsb dan muncul pesan error
        if (user.id !== request.user.id) throw { message: "Forbidden", status: 403 };
        //   jika berhasil maka boleh lanjut ke route menuju controller
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};
