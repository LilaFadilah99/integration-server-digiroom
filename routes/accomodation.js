const router = require("express").Router();
const AccomodationController = require("../controllers/AccomodationController");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);
router.get("/", AccomodationController.getAccomodation);
router.post("/", AccomodationController.addAccomodation);
router.put("/:id", authorization, AccomodationController.editAccomodation);
router.patch("/status/:id", authorization, AccomodationController.editStatusAccomodation);
router.get("/:id", authorization, AccomodationController.getAccomodationById);
router.delete("/:id", authorization, AccomodationController.deleteAccomodation);

module.exports = router;
