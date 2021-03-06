const CreditCard = require('../models/creditcard');

class CardController {
  async index(req, res) {
    const cards = await CreditCard.all();

    return res.json(cards.toJSON());
  }
}

export default new CardController();
