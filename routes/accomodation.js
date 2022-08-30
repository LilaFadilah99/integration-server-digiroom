const router = require("express").Router();
const AccomodationController = require("../controllers/AccomodationController");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);
router.get("/", AccomodationController.getAccomodation);
router.post("/add", AccomodationController.addAccomodation);
router.put("/update/:id", AccomodationController.editAccomodation);
router.get("/:id", AccomodationController.getAccomodationById);
router.delete("/delete/:id", AccomodationController.deleteAccomodation);

module.exports = router;
