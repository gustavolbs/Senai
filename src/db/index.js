const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Produto = require('../models/produto');
const Checkout = require('../models/checkout');
const CheckoutProduct = require('../models/checkout_product');
const CreditCard = require('../models/creditcard');
const Stock = require('../models/stock');
const Transaction = require('../models/transaction');

const connection = new Sequelize(dbConfig);

Produto.init(connection);
Checkout.init(connection);
CheckoutProduct.init(connection);
CreditCard.init(connection);
Stock.init(connection);
Transaction.init(connection);

module.exports = connection;
