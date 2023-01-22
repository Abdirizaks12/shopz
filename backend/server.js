// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();
// import express from 'express';
// import cors from 'cors';
// import data from './data.js';
// const app = express();
// app.use(cors());
// const port = process.env.PORT | 5000;

// app.get('/api/products', async (req, res) => {
//   try {
//     await res.send(data.products);
//     console.log('data =', data.products);
//   } catch (error) {
//     console.log(error);
//   }
// });
// app.listen(port, () => console.log(`app listen on port ${port}`));

import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
