module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      items: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      save_card: {},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Checkouts');
  },
};
