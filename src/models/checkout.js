module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    'Checkout',
    {
      amount: DataTypes.INTEGER,
      address: DataTypes.STRING,
      customer: DataTypes.STRING,
      installments: DataTypes.INTEGER,
      card_id: DataTypes.STRING,
      items: {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        unit_price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        tangible: DataTypes.BOOLEAN,

        get() {
          return JSON.parse(this.getDataValue('items'));
        },
        set(val) {
          return this.setDataValue('items', JSON.stringify(val));
        },
      },
    },
    {}
  );
  Checkout.associate = function(models) {
    // associations can be defined here
    this.hasOne(models.Transaction, { foreignKey: 'transaction_id' });
    this.belongsToMany(models.Produto, { through: Checkout });
  };
  return Checkout;
};
