const db = require('../configs/dbConfig');
const cache = require('../configs/cacheConfig');
const cacheKey = 'clientes';


class ClienteService {
    static async getAllClientes() {
      if (cache.has(cacheKey)) {
        console.log('GET /clientes/ - cache encontrado')
        return cache.get(cacheKey)
      } else {
        console.log('GET /clientes/ - cache não encontrado, acessando banco de dados...')
          const [rows] = await db.execute('SELECT * FROM clientes');
          cache.set(cacheKey, rows, 30);
          return rows;
      }
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
        if (result.insertId) {
            cache.del(cacheKey);
            console.log('POST /clientes/ - Nova inserção detectada, o cache foi limpo.');
        }
        return result.insertId;
    }

    static async updateCliente(id, cliente) {
        const { nome, sobrenome, email, idade } = cliente;
        const [result] = await db.execute(
            'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
            [nome, sobrenome, email, idade, id]
        );
        if (result.affectedRows > 0) {
            cache.del(cacheKey);
            console.log(`PUT /clientes/${id} - Nova alteração detectada, o cache foi limpo.`);
        }
        return result.affectedRows > 0;
    }

    static async deleteCliente(id) {
        const [result] = await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            cache.del(cacheKey);
            console.log(`DELETE /clientes/${id} - Nova exclusão detectada, o cache foi limpo`)
        }
        return result.affectedRows > 0;
    
    }
}

module.exports = ClienteService;
