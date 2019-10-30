const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Produto;
