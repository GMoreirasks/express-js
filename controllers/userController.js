const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
class UserController {
    static async login(req, res) {
        const { usuario, senha } = req.body;

        try {
            // Verifica se o usuário existe no banco de dados
            const user = await UserService.getUser(usuario, senha);

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Gera um token JWT
            const token = jwt.sign({ usuario }, 'secretpassword', { expiresIn: '1h' });
            res.set('Authorization', `${token}`);
            // Salva o token no usuário no banco de dados
            await UserService.setToken(user.id, token);

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor.' });
        }
    }

    static async logout(req, res) {
        let token = req.header('Authorization')
        if(!token) {
            res.status(500).json({ message: 'não foi possivel recuperar o token' });
        }
        const result = await UserService.cleanToken(token);
        if (result) {
            res.status(200).json({ message: 'logout feito com sucesso' });
        } else {
            res.status(500).json({ message: 'logout azedou' });
        }
    }
}

module.exports = UserController;
