const express = require('express');
const ClienteRoutes = require('./routes/clienteRoutes');
const ProdutoRoutes = require('./routes/produtoRoutes');
const UserRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

ClienteRoutes.configureAllRoutes(app);
ProdutoRoutes.configureAllRoutes(app);
UserRoutes.configureAllRoutes(app);

app.listen(port);
console.log('Server started at http://localhost:' + port);

module.exports = app;
