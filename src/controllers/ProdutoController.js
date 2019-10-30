import * as Yup from 'yup';

const models = require('../models/index');

class ProdutoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number().required(),
      image: Yup.string().required(),
    });

    console.log('chegou aqui');
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const productExists = await models.Produto.findOne({
      where: { name: req.body.name },
    });

    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    req.body.value = req.body.value * 100;
    const { id, name, value, image } = await models.Produto.create(req.body);

    return res.json({
      id,
      name,
      value,
      image,
    });
  }

  async index(req, res) {
    const produtos = await models.Produto.all();

    return res.json(produtos.toJSON());
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await models.Produto.find(id);

    return res.json(product.toJSON());
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number().required(),
      image: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails!'})
    }

    const {name} = req.body;

    const product = await models.Produto.findByPk(req.productId);

    if (name && name !== product.name) {
      const productExists = await models.Product.findOne({where: {name}});

      if (productExists) {
        return res.status(400).json({error: "Product already exists!"});
      }
    }

    const {id, name, value, image} = await product.update(req.body);

    return res.json({
      id,
      name,
      value,
      image,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = await models.Produto.findByPk(id);

    await product.destroy();

    return res.send();
  }
}

export default new ProdutoController();
