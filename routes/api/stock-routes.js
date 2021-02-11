const router = require("express").Router();
const apiController = require("../../controllers/apiController.js");

router
  .route("/")
  .get(apiController.findAllStocks)
  .post(apiController.createStock);

router
  .route("/:id")
  .put(apiController.updateStock)
  .delete(apiController.removeStock);

  module.exports = router;