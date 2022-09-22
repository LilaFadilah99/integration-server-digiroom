const router = require("express").Router();
const AccomodationController = require("../controllers/AccomodationController");
const { authentication, authorization } = require("../middlewares/auth");

router.get("/", AccomodationController.getAccomodation);
router.get("/all/:id", AccomodationController.getAccomodationById);
router.use(authentication);
router.post("/payment/:id", AccomodationController.handlePayment);
// for customer
router.get("/favorites", AccomodationController.getDataFavorites);
router.post("/favorites/:id", AccomodationController.addDataFavorites);
router.delete("/favorites/:id", AccomodationController.deleteDataFavorite);
router.post("/booking/:id", AccomodationController.handleAddBookingRoom);
router.get("/booking/:id", AccomodationController.handleGetBookingRoom);

router.post("/", AccomodationController.addAccomodation);
router.put("/:id", authorization, AccomodationController.editAccomodation);
router.patch("/status/:id", authorization, AccomodationController.editStatusAccomodation);
router.delete("/:id", authorization, AccomodationController.deleteAccomodation);

module.exports = router;
