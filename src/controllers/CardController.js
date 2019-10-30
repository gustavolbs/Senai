const models = require('../models/index');

class CardController {
  async index(req, res) {
    const cards = await models.CreditCard.all();

    return res.json(cards.toJSON());
  }
}

export default new CardController();
