const { Router } = require("express");
const businessController = require("../controllers/business-controller");
const router = Router();
//const { requireAuth } = require("../middleware/auth-middleware");

router.get("/", businessController.getAllBusinesses);
//router.put("/:businessId", requireAuth, businessController.editServices);

module.exports = router;
