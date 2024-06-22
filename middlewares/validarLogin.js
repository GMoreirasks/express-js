const jwt = require('jsonwebtoken');

class ValidaLogin {
    static checarAutenticacao(req) {
        let token = req.header('Authorization');
        if (!token) { return false }
        try {
            jwt.verify(token, 'secretpassword');
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = ValidaLogin