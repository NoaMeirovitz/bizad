const { Router } = require("express");
const authController = require("../controllers/auth-controller");
const router = Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/services", authController.addService);
router.delete("/services", authController.deleteService);

module.exports = router;
