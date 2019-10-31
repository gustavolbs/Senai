const { Model, DataTypes } = require('sequelize');

class creditcard extends Model {
  static init(sequelize) {
    super.init(
      {
        number: DataTypes.STRING,
        card_id: DataTypes.STRING,
        holder_name: DataTypes.STRING,
        brand: DataTypes.STRING,
        expiration_date: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = creditcard;
