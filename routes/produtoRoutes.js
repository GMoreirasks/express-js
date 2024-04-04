const ProdutoController = require('../controllers/produtoController');
/** Classe das rotas dos produtos. */
class ProdutoRoutes {
    /**
     * Função de configuração das rotas.
     * @param {object} app - aplicação.
     */
    static configureAllRoutes(app) {
        app.get('/produto/', function (req, res) {
            ProdutoController.getAllProdutos(req, res);
        });

        app.get('/produto/:id', function (req, res) {
            ProdutoController.getProdutoById(req, res);
        });

        app.post('/produto/', function (req, res) {
            ProdutoController.createProduto(req, res);
        });

        app.delete('/produto/:id', function (req, res) {
            ProdutoController.deleteProduto(req, res);
        });

        app.put('/produto/:id', function (req, res) {
            ProdutoController.updateProduto(req, res);
        });
    }
}

module.exports = ProdutoRoutes;
