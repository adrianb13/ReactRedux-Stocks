const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const stockRoutes = require("./stock-routes.js");

//API Routes
router.use("/users", userRoutes);
router.use("/stocks", stockRoutes);

module.exports = router;