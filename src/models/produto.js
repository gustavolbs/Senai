module.exports = (sequelize, Sequelize) => {
  const Produto = sequelize.define('Produto', {
    name: Sequelize.STRING,
    value: Sequelize.INTEGER,
    image: Sequelize.STRING,
  });

  return Produto;
};
