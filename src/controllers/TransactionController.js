import pagarme from 'pagarme';

const Transaction = require('../models/transaction');

const secret = require('../config/secret');

class TransactionController {
  async destroy(req, res) {
    const { id } = req.params;

    try {
      const transaction = await Transaction.find(id);

      const client = await pagarme.client.connect({
        api_key: secret.API_KEY,
      });

      await client.transaction.refund({
        id: transaction.transaction_id,
      });

      transaction.merge({
        status: 'refund',
      });

      await transaction.save();

      return res.json(transaction);
    } catch (err) {
      return res.status(500).json({});
    }
  }
}

export default new TransactionController();
