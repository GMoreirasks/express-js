const db = require('../configs/dbConfig');

class ClienteService {
    static async getAllClientes() {
        const [rows] = await db.execute('SELECT * FROM clientes');
        return rows;
    }

    static async getClienteById(id) {
        const [rows] = await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
        return rows[0];
    }

    static async createCliente(cliente) {
        const { nome, sobrenome, email, idade } = cliente;
        const [result] = await db.execute(
            'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
            [nome, sobrenome, email, idade]
        );
        return result.insertId;
    }

    static async updateCliente(id, cliente) {
        const { nome, sobrenome, email, idade } = cliente;
        const [result] = await db.execute(
            'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
            [nome, sobrenome, email, idade, id]
        );
        return result.affectedRows > 0;
    }

    static async deleteCliente(id) {
        const [result] = await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ClienteService;
