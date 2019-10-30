const { Model, DataTypes } = require('sequelize');

class transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        transaction_id: DataTypes.STRING,
        status: DataTypes.STRING,
        authorization_code: DataTypes.STRING,
        brand: DataTypes.STRING,
        authorized_amount: DataTypes.INTEGER,
        tid: DataTypes.STRING,
        installments: DataTypes.INTEGER,
        checkout_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = transaction;
