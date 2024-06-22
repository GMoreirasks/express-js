const UserController = require('../controllers/userController');

class UserRoutes {
    static configureAllRoutes(app) {
        app.post('/login', function(req, res) {
            UserController.login(req, res);
        });

        app.post('/logout', function(req, res) {
            UserController.logout(req, res);
        });
    }
}

module.exports = UserRoutes;
