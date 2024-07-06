module.exports = function (sequelize, DataTypes) {
  const Prediction = sequelize.define("Prediction", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idGame: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    winner:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    goals:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Prediction.associate = function (models) {
    console.log('Associating Prediction with models:', Object.keys(models)); // Log models
    if (models.User) {
      Prediction.belongsTo(models.User, {
        foreignKey: { allowNull: false },
      });
    } else {
      console.error('User model is not defined');
    }
  };

  return Prediction;
};
