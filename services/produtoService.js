const db = require('../configs/dbConfig');
const cache = require('../configs/cacheConfig');
const cacheKey = 'produtos';

class ProdutoService {
    static async getAllProdutos() {
        if (cache.has(cacheKey)) {
            console.log('GET /produtos/ - cache encontrado')
            return cache.get(cacheKey)
          } else {
            console.log('GET /produtos/ - cache não encontrado, acessando banco de dados...')
              const [rows] = await db.execute('SELECT * FROM produtos');
              cache.set(cacheKey, rows, 30);
              return rows;
          }
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
        if (result.insertId) {
            cache.del(cacheKey);
            console.log('POST /produtos/ - Nova inserção detectada, o cache foi limpo.');
        }
        return result.insertId;
    }

    static async updateProduto(id, produto) {
        const { nome, descricao, preco } = produto;
        const [result] = await db.execute(
            'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
            [nome, descricao, preco, id]
        );
        if (result.affectedRows > 0) {
            cache.del(cacheKey);
            console.log(`PUT /produtos/${id} - Nova alteração detectada, o cache foi limpo.`);
        }
        return result.affectedRows > 0;
    }

    static async deleteProduto(id) {
        const [result] = await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            cache.del(cacheKey);
            console.log(`DELETE /produtos/${id} - Nova exclusão detectada, o cache foi limpo`)
        }
        return result.affectedRows > 0;
    }
}

module.exports = ProdutoService;
