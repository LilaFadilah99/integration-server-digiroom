const router = require("express").Router();
const AccomodationController = require("../controllers/AccomodationController");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);
router.get("/", AccomodationController.getAccomodation);
router.post("/add", AccomodationController.addAccomodation);
router.put("/update/:id", authorization, AccomodationController.editAccomodation);
router.patch("/update/status/:id", authorization, AccomodationController.editStatusAccomodation);
router.get("/:id", authorization, AccomodationController.getAccomodationById);
router.delete("/delete/:id", authorization, AccomodationController.deleteAccomodation);

module.exports = router;
