const router = require("express").Router();
const apiController = require("../../controllers/apiController.js");

router
  .route("/")
  .get(apiController.findUser)
