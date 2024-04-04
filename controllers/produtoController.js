const ProdutoService = require('../services/produtoService');
/** Class representing a point. */
class ProdutoController {
    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
