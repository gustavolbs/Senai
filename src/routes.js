const express = require('express');

const multer = require('./middlewares/multer');
const filehelper = require('./middlewares/file-helper');

const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();

// routes.get('/', (req, res) => { res.json({ msg: 'Hello World' }); });

routes.get('/upload', (req, res, next) => {
  res.send(`
    <head>
      <title>Criação</title>
    </head>
    <body>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image" id="imageInput"/>
        <input type="text" name="name" />
        <input type="number" name="value" />

        <button type="submit">Enviar</button>
      </form>
    </body>
    </html>
  `);
});

routes.post('/upload', multer.single('image'), (req, res, next) => {
  if (req.file) {
    filehelper
      .compressImage(req.file, 100)
      .then(newPath =>
        res.send(
          `Upload e compressão realizados com sucesso! O novo caminho é:${newPath}`
        )
      )
      .catch(err => console.log(err));
  }

  // return res.send('Erro no upload');
});

routes.get('/produto', (req, res) => {});
routes.post('/produto', async (req, res) => {
  await ProdutoController.store;
});
routes.get('/produto/:id', (req, res) => {});
routes.put('/produto/:id', (req, res) => {});
routes.delete('/produto/:id', (req, res) => {});

module.exports = routes;
