module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
/*     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }, */
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Stock);
  };

  return User;
};