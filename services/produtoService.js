const db = require('../configs/dbConfig');
/** Classe da service dos produtos. */
class ProdutoService {
    /**
     * Retorna todos os produtos do banco de dados.
     * @return {array} .
     */
    static async getAllProdutos() {
        const [rows] = await db.execute('SELECT * FROM produtos');
        return rows;
    }
    /**
   * Retorna o produto com base na sua ID.
   * @param {number} id - .
   * @return {object} .
   */
    static async getProdutoById(id) {
        const [rows] =
            await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
        return rows[0];
    }
    /**
    * Cadastra um produto novo no banco de dados.
    * @param {object} produto - .
    * @return {number} .
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
    * Atualiza um produto já existente.
    * @param {number} id - .
    * @param {object} produto - .
    * @return {boolean} .
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
   * Deleta um produto do banco de dados.
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
