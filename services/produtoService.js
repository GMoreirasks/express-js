const db = require('../configs/dbConfig');

class ProdutoService {
    static async getAllProdutos() {
        const [rows] = await db.execute('SELECT * FROM produtos');
        return rows;
    }

    static async getProdutoById(id) {
        const [rows] = await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
        return rows[0];
    }

    static async createProduto(produto) {
        const { nome, descricao, preco } = produto;
        const [result] = await db.execute(
            'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
            [nome, descricao, preco]
        );
        return result.insertId;
    }

    static async updateProduto(id, produto) {
        const { nome, descricao, preco } = produto;
        const [result] = await db.execute(
            'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
            [nome, descricao, preco, id]
        );
        return result.affectedRows > 0;
    }

    static async deleteProduto(id) {
        const [result] = await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ProdutoService;
