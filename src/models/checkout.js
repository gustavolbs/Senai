const { Model, DataTypes } = require('sequelize');

class checkout extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: DataTypes.BIGINT,
        fee: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = checkout;
