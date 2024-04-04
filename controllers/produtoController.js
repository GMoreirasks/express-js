const ProdutoService = require('../services/produtoService');
/** Classe controller do produto . */
class ProdutoController {
    /**
     * Função para tratamento de erros.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async getAllProdutos(req, res) {
        try {
            const produtos = await ProdutoService.getAllProdutos();
            res.json(produtos);
        } catch (error) {
            res.send('Erro ao buscar produtos');
            res.end();
        }
    }
    /**
     * Função para tratamento de erros caso não tenha o produto.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async getProdutoById(req, res) {
        const { id } = req.params;
        try {
            const produto = await ProdutoService.getProdutoById(id);
            if (produto) {
                res.json(produto);
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        } catch (error) {
            res.send('Erro ao buscar produto');
            res.end();
        }
    }
    /**
     * Função para tratamento de erro ao salvar  o produto.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async createProduto(req, res) {
        const produto = req.body;
        try {
            const id = await ProdutoService.createProduto(produto);
            res.status(201).json({ id });
        } catch (error) {
            res.send('Erro ao salvar produto');
            res.end();
        }
    }
    /**
     * Função para tratamento de erros de atualização do produto.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async updateProduto(req, res) {
        const { id } = req.params;
        const produto = req.body;
        try {
            const result = await ProdutoService.updateProduto(id, produto);
            if (result) {
                res.json({ message: 'Produto atualizado com sucesso' });
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        } catch (error) {
            res.send('Erro ao atualizar produto');
            res.end();
        }
    }
    /**
     * Função para tratamento de erros ao deletar algum produto.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async deleteProduto(req, res) {
        const { id } = req.params;
        try {
            const result = await ProdutoService.deleteProduto(id);
            if (result) {
                res.json({ message: 'Produto deletado com sucesso' });
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        } catch (error) {
            res.send('Erro ao deletar produto');
            res.end();
        }
    }
}

module.exports = ProdutoController;
