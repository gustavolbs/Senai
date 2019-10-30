import * as Yup from 'yup';

const Produto = require('../models/produto');

class ProdutoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      image: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const productExists = await Produto.findOne({
      where: { title: req.body.title },
    });

    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    req.body.price = req.body.price * 100;
    const { id, title, price, image } = await Produto.create(req.body);

    return res.json({
      id,
      title,
      price,
      image,
    });
  }

  async index(req, res) {
    const produtos = await Produto.all();

    return res.json(produtos.toJSON());
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await Produto.find(id);

    return res.json(product.toJSON());
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      image: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails!'})
    }

    const {title} = req.body;

    const product = await Produto.findByPk(req.productId);

    if (title && title !== product.title) {
      const productExists = await Product.findOne({where: {title}});

      if (productExists) {
        return res.status(400).json({error: "Product already exists!"});
      }
    }

    const {id, title, price, image} = await product.update(req.body);

    return res.json({
      id,
      title,
      price,
      image,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = await Produto.findByPk(id);

    await product.destroy();

    return res.send();
  }
}

export default new ProdutoController();
