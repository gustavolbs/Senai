const { Model, DataTypes } = require('sequelize');

class Stock extends Model {
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

module.exports = Stock;
