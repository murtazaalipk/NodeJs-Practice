
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());

const myProducts = [
    { id: 1, name: 'Mobile', price: 60000 },
    { id: 2, name: 'Laptop', price: 110000 },
    { id: 3, name: 'Smart Watch', price: 9000 },
  ];


app.get('/api/products', (req, res) => {
  res.json(myProducts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
