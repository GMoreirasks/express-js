const db = require('../configs/dbConfig');
/** Class representing a point. */
class ClienteService {
    /**
     * Get the y value.
     * @return {Array} The y value.
     */
    static async getAllClientes() {
        const [rows] = await db.execute('SELECT * FROM clientes');
        return rows;
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {number} id - The string containing two comma-separated numbers.
     * @return {object} A Point object.
     */
    static async getClienteById(id) {
        const [rows] =
            await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
        return rows[0];
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} cliente - The string containing two.
     * @return {number} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {number} id - The string containing two comma-separated numbers.
     * @param {object} cliente - The string containing .
     * @return {boolean} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {number} id - The string containing two comma-separated numbers.
     * @return {boolean} A Point object.
     */
    static async deleteCliente(id) {
        const [result] =
            await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ClienteService;
