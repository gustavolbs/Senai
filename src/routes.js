import express from 'express';
import ProdutoController from './controllers/ProdutoController';

const multer = require('./middlewares/multer');
const filehelper = require('./middlewares/file-helper');

const routes = express.Router();

// routes.get('/', (req, res) => { res.json({ msg: 'Hello World' }); });

routes.get('/produto', (req, res, next) => {
  res.send(`
    <head>
      <title>Criação</title>
    </head>
    <body>
      <form action="/produto" method="post" enctype="multipart/form-data">
        <input type="text" name="title" placeholder="Nome do produto" />
        <input type="number" name="price" placeholder="Valor do produto" />
        <input type="file" name="image" id="imageInput"/>

        <button type="submit">Enviar</button>
      </form>
    </body>
    </html>
  `);
});

routes.post('/produto', multer.single('image'), (req, res, next) => {
  if (req.file) {
    filehelper
      .compressImage(req.file, 100)
      .then(newPath => {
        req.body = {
          title: req.body.title,
          price: req.body.price,
          image: newPath
            .split('/')
            .pop()
            .split('.')[0],
        };
        ProdutoController.store(req, res);
      })
      .catch(err => console.log(err));
  }
});

routes.get('/produto/:id', (req, res) => {});
routes.put('/produto/:id', (req, res) => {});
routes.delete('/produto/:id', (req, res) => {});

module.exports = routes;
