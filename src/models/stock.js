const { Model, DataTypes } = require('sequelize');

class stock extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = stock;
