import * as Yup from 'yup';

const models = require('../models/index');

class CheckoutController {
  async store(req, res) {
    const {address, customer, card_hash, items, installments, amount, save_card, card_id} = req.body;

    try {
      let card;
      if (card_id) {
        card = await models.CreditCard.findOrFail(card_id);
      }
    }
  }
}

export default new CheckoutController();
