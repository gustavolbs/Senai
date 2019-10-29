module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });

  return Produto;
};
