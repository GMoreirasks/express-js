const ClienteController = require('../controllers/clienteController');
/** Classe das rotas dos clientes. */
class ClienteRoutes {
    /**
   * Função de configuração das rotas.
   * @param {object} app - aplicação.
   */
    static configureAllRoutes(app) {
        app.get('/cliente/', function (req, res) {
            ClienteController.getAllClientes(req, res);
        });

        app.get('/cliente/:id', function (req, res) {
            ClienteController.getClienteById(req, res);
        });

        app.post('/cliente/', function (req, res) {
            ClienteController.createCliente(req, res);
        });

        app.delete('/cliente/:id', function (req, res) {
            ClienteController.deleteCliente(req, res);
        });

        app.put('/cliente/:id', function (req, res) {
            ClienteController.updateCliente(req, res);
        });
    }
}

module.exports = ClienteRoutes;
