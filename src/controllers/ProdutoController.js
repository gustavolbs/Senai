import * as Yup from 'yup';
import Produto from '../models/produto';

class ProdutoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number().required(),
      image: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const productExists = await Produto.find({
      where: { name: req.body.name },
    });

    console.log('chegou aqui');
    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    // const { id, name, value, image } = await Produto.create(req.body);
    const produtinho = await Produto.create(req.body);

    return res.json({
      produtinho,
    });
  }
}

export default new ProdutoController();
