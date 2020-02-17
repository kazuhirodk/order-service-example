'use strict';

module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Offer;
};
