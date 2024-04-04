const db = require('../configs/dbConfig');
/** Classe da service dos clientes. */
class ClienteService {
    /**
     * Função para retornar todos os clientes do banco de dados.
     * @return {Array} .
     */
    static async getAllClientes() {
        const [rows] = await db.execute('SELECT * FROM clientes');
        return rows;
    }

    /**
     * Função para retornar os clientes pelo ID.
     * @param {number} id - .
     * @return {object} .
     */
    static async getClienteById(id) {
        const [rows] =
            await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
        return rows[0];
    }

    /**
     * Função para criar novo cliente.
     * @param {object} cliente - .
     * @return {number} .
     */
    static async createCliente(cliente) {
        const { nome, sobrenome, email, idade } = cliente;
        const [result] = await db.execute(
            'INSERT INTO clientes ' +
            '(nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
            [nome, sobrenome, email, idade],
        );
        return result.insertId;
    }

    /**
     * Função para atualizar cliente no banco de dados.
     * @param {number} id - .
     * @param {object} cliente -  .
     * @return {boolean} .
     */
    static async updateCliente(id, cliente) {
        const { nome, sobrenome, email, idade } = cliente;
        const [result] = await db.execute(
            'UPDATE clientes SET nome = ?,' +
            ' sobrenome = ?, email = ?, idade = ? WHERE id = ?',
            [nome, sobrenome, email, idade, id],
        );
        return result.affectedRows > 0;
    }

    /**
     * Função para deletar cliente do bando de dados.
     * @param {number} id - .
     * @return {boolean} .
     */
    static async deleteCliente(id) {
        const [result] =
            await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ClienteService;
