const { Model, DataTypes } = require('sequelize');

class Checkout extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: DataTypes.INTEGER,
        fee: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Checkout;
