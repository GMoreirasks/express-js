const db = require('../configs/dbConfig');
/** Class representing a point. */
class ProdutoService {
    /**
     * Get the x value.
     * @return {array} The x value.
     */
    static async getAllProdutos() {
        const [rows] = await db.execute('SELECT * FROM produtos');
        return rows;
    }
    /**
   * Convert a string containing two comma-separated numbers into a point.
   * @param {number} id - The string containing two comma-separated numbers.
   * @return {object} A Point object.
   */
    static async getProdutoById(id) {
        const [rows] =
            await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
        return rows[0];
    }
    /**
    * Convert a string containing two comma-separated numbers into a point.
    * @param {object} produto - The string containing ated numbers.
    * @return {number} A Point object.
    */
    static async createProduto(produto) {
        const { nome, descricao, preco } = produto;
        const [result] = await db.execute(
            'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
            [nome, descricao, preco],
        );
        return result.insertId;
    }
    /**
    * Convert a string containing two comma-separated numbers into a point.
    * @param {number} id - The string containing two comma-separated numbers.
    * @param {object} produto - The string conta-separated numbers.
    * @return {boolean} A Point object.
    */
    static async updateProduto(id, produto) {
        const { nome, descricao, preco } = produto;
        const [result] = await db.execute(
            'UPDATE produtos SET nome = ?,'+
            ' descricao = ?, preco = ? WHERE id = ?',
            [nome, descricao, preco, id],
        );
        return result.affectedRows > 0;
    }
    /**
   * Convert a string containing two comma-separated numbers into a point.
   * @param {number} id - The string containing two comma-separated numbers.
   * @return {boolean} A Point object.
   */
    static async deleteProduto(id) {
        const [result] =
            await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ProdutoService;
