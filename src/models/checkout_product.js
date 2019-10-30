const { Model, DataTypes } = require('sequelize');

class Checkout_Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: DataTypes.INTEGER,
        checkout_id: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Checkout_Product;
