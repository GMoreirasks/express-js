const db = require('../configs/dbConfig');

class UserService {
    static async getUser(usuario, senha) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha]);
        return rows[0];
    }

    static async setToken(id, token) {
        const [result] = await db.execute('UPDATE usuarios SET token = ? WHERE id = ?', [token, id]);
        return result.affectedRows > 0;
    }

    static async cleanToken(token) {
        const [result] = await db.execute('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
        return result.affectedRows > 0;
    }
}

module.exports = UserService;