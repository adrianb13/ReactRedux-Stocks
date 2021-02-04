const db = require("../models");

module.exports = {
  findUser: (req, res) => {
    db.User
      .findOne({
        where: { email: req.body.email },
        include: [
          { model: db.Stock }
        ]
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  createUser: (req, res) => {
    db.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password  
      })
  },

  //Stock API Calls
  findAllStocks: (req, res) => {
    db.Stock
      .findAll({})
      .then(dbStocks => res.json(dbStocks))
      .catch(err => res.status(422).json(err));
  },
  //Search will be done on Front-End
  /* findOneStock: (req, res) => {
    db.Stock
      .findOne({
        where: { ticker: req.body.ticker }
      })
  }, */
  createStock: (req, res) => {
    db.Stock
      .create({
        ticker: req.body.ticker,
        companyName: req.body.companyName,
        sector: req.body.sector,
        shareCount: req.body.shareCount,
        shareCost: req.body.shareCost,
        currentPrice: req.body.currentPrice
      })
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  },
  removeStock: (req, res) => {
    db.Stock
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  },
  updateStock: (req, res) => {
    db.Stock
      .update(req.body, { 
        where: {
          id: req.params.id
        }
      })
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  }
}