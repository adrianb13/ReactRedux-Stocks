module.exports = (sequelize, DataTypes) => {
  let Stock = sequelize.define("Stock", {
    ticker: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shareCount: {
      type: DataTypes.DECIMAL(10,2),
      default: 0,
      allowNull: false
    },
    shareCost: {
      type: DataTypes.DECIMAL(10,4),
      default: 0,
      allowNull: false
    },
    currentPrice: {
      type: DataTypes.DECIMAL(10,4),
      default: 0,
      allowNull: false
    }
  });

  Stock.associate = (models) => {
    Stock.belongsTo(models.User);
  };

  return Stock;
};