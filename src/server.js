const express = require('express');

const routes = require('./routes');

const app = express();

// app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);

// const { Produto } = require('./models');

// const test = async () => {
//   const produto = await Produto.create({
//     name: 'Sapato Nega Fulô',
//     value: 1500,
//     image: '123 imagem',
//   });
//   console.log(JSON.stringify(produto));
// };

// test();
