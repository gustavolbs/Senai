module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define(
    'CreditCard',
    {
      number: DataTypes.STRING,
    },
    {}
  );
  CreditCard.associate = function(models) {
    // associations can be defined here
  };
  return CreditCard;
};
