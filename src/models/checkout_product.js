const { Model, DataTypes } = require('sequelize');

class checkoutproduct extends Model {
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

module.exports = checkoutproduct;
