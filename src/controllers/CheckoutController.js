import pagarme from 'pagarme';

const CreditCard = require('../models/creditcard');
const Checkout = require('../models/checkout');
const Transaction = require('../models/transaction');

const secret = require('../config/secret');

class CheckoutController {
  async store(req, res) {
    const {
      billing,
      customer,
      card_hash,
      items,
      installments,
      amount: amountClient,
      save_card,
      card_id,
      card_number,
      card_cvv,
      card_expiration_date,
      card_holder_name,
    } = req.body;

    try {
      let card_first;
      if (card_id) {
        card_first = await CreditCard.findOrFail(card_id);
      }

      const client = await pagarme.client.connect({
        api_key: secret.API_KEY,
      });

      const fee = 1000;

      const amount = amountClient * 100 + fee;

      try {
        console.log();

        const pagarmeTransaction = await client.transactions.create({
          amount,
          // ...(card_hash ? { card_hash } : { card_id: card_first.card_id }),
          card_number,
          card_cvv,
          card_expiration_date,
          card_holder_name,
          customer: {
            // AutoIncremental
            external_id: customer.external_id,
            name: customer.name,
            type: customer.type,
            country: customer.country,
            email: customer.email,
            documents: customer.documents,
            phone_numbers: customer.phone_numbers,
            birthday: customer.birthday,
          },
          billing: {
            name: customer.name,
            address: {
              country: billing.address.country,
              state: billing.address.state,
              city: billing.address.city,
              neighborhood: billing.address.neighborhood,
              street: billing.address.street,
              street_number: billing.address.street_number,
              zipcode: billing.address.zipcode,
            },
          },
          items: items.map(item => ({
            id: String(item.id),
            title: item.title,
            unit_price: item.unit_price,
            quantity: item.quantity,
            tangible: item.tangible,
          })),
        });

        const { card } = pagarmeTransaction;

        console.log('teste');
        const teste = await CreditCard.findOrCreate({
          card_id: card.id,
          number: `${card.first_digits}*********${card.last_digits}`,
          holder_name: card.holder_name,
          brand: card.brand,
          expiration_date: card.expiration_date,
        });

        console.log(teste);
        console.log('chegou aqui');

        const checkout = await Checkout.create({
          amount: parseInt(amount * 100, 10),
          fee,
        });

        console.log(checkout);

        const transactions = await Transaction.create({
          checkout_id: checkout.id,
          transaction_id: pagarmeTransaction.id,
          status: pagarmeTransaction.status,
          authorization_code: pagarmeTransaction.authorization_code,
          brand: pagarmeTransaction.card.brand,
          authorized_amount: pagarmeTransaction.authorized_amount,
          tid: pagarmeTransaction.tid,
          installments,
        });

        return res.json(transactions.toJSON());
      } catch (err) {
        console.log(err.response);
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const checkout = await Checkout.find(id);
    await checkout.loadMany(['transaction', 'products']);

    return res.json(checkout.toJSON());
  }
}

export default new CheckoutController();
