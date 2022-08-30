const router = require("express").Router();
const userRouter = require("./user");
const accomodationRouter = require("./accomodation");

router.use("/user", userRouter);
router.use("/accomodation", accomodationRouter);

module.exports = router;
