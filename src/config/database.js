const secret = require('./secret');

module.exports = {
  username: 'senai',
  password: secret.DATABASE_PASSWORD,
  database: 'senai',
  host: '127.0.0.1',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    timestamps: true,
    undescored: true,
  },
};
