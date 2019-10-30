import * as Yup from 'yup';
import pagarme from 'pagarme';

const CreditCard = require('../models/creditcard');
const Checkout = require('../models/checkout');
const Transaction = require('../models/transaction');


const secret = require('./secret');


class CheckoutController {
  async store(req, res) {
    const {address, customer, card_hash, items, installments, amount: amountClient, save_card, card_id} = req.body;

    try {
      let card;
      if (card_id) {
        card = await CreditCard.findOrFail(card_id);
      }

      const client =  await pagarme.client.connect({
        api_key: secret.API_KEY,
      })

      const fee = 1000;

      const amount = amountClient * 100 + fee;

      const pagarmeTransaction = await client.transactions.create({
        amount: amount,
        ...(card_hash ? { card_hash } : { card_id: card.card_id }),
        customer: {
          // AutoIncremental
          external_id: 1,
          name: custome.name,
          type: "individual",
          country: address.country,
          email: custome.email,
          documents: [
            {
              type: "cpf",
              number: customer.cpf
            },
            {
              type: 'rg',
              number: customer.rg,
            }
          ],
          phone_numbers: [customer.phone],
          birthday: customer.birthday,
        },
        billing: {
          name: customer.name,
          address: {
            country: address.country,
            state: address.state,
            city: address.city,
            neighborhood: address.neighborhood,
            street: address.street,
            street_number: address.street_number,
            zipcode: address.zipcode
          }
        },
        items: items.map(item => ({
          id: String(item.id),
          title: item.name,
          unit_price: item.value,
          quantity: item.quantity,
          tangible: item.tangible
        }))
      })

      const { card } = pagarmeTransaction;

      await CreditCard.findOrCreate({
        card_id: card.id,
        number: `${card.first_digits}*********${card.last_digits}`,
        holder_name: card.holder_name,
        brand: card.brand,
        expiration_date: card.expiration_date,
      });

      const checkout = await Checkout.create({
        amount: parseInt(amount * 100, 10),
        fee,
      });

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
      return res.status(400).json(err);
    }
  }

  async show(req, res) {
    const {id} = req.params;

    const checkout = await Checkout.find(id);
    await checkout.loadMany(['transaction', 'products']);

    return res.json(checkout.toJSON());
  }
}

export default new CheckoutController();
