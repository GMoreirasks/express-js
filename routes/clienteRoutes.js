const ClienteController = require('../controllers/clienteController');
const ValidaLogin = require('../middlewares/validarLogin');

class ClienteRoutes {
    static configureAllRoutes(app) {
        app.get('/cliente/', function (req, res) {
            if (ValidaLogin.checarAutenticacao(req)) {
                ClienteController.getAllClientes(req, res);
            } else {
                res.status(403).json({ message: 'usuário não autenticado' });
            }

        });

        app.get('/cliente/:id', function (req, res) {
            if (ValidaLogin.checarAutenticacao(req)) {
                ClienteController.getClienteById(req, res);
            } else {
                res.status(403).json({ message: 'usuário não autenticado' });
            }
        });

        app.post('/cliente/', function (req, res) {
            if (ValidaLogin.checarAutenticacao(req)) {
                ClienteController.createCliente(req, res);
            } else {
                res.status(403).json({ message: 'usuário não autenticado' });
            }
        })

        app.delete('/cliente/:id', function (req, res) {
            if (ValidaLogin.checarAutenticacao(req)) {
                ClienteController.deleteCliente(req, res);
            } else {
                res.status(403).json({ message: 'usuário não autenticado' });
            }
        });

        app.put('/cliente/:id', function (req, res) {
            if (ValidaLogin.checarAutenticacao(req)) {
                ClienteController.updateCliente(req, res);
            } else {
                res.status(403).json({ message: 'usuário não autenticado' });
            }
        });
    }
}

module.exports = ClienteRoutes;
