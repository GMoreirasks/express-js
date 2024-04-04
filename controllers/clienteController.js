const ClienteService = require('../services/ClienteService');
/** Classe controller do cliente . */
class ClienteController {
    /**
     * Função para tratamento de erros ao buscar cliente no banco de dados.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async getAllClientes(req, res) {
        try {
            const clientes = await ClienteService.getAllClientes();
            res.json(clientes);
        } catch (error) {
            res.send('Erro ao buscar clientes');
            res.end();
        }
    }
    /**
     * Função para tratamentos de erros na busca do cliente pelo ID.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} A Point object.
     */
    static async getClienteById(req, res) {
        const { id } = req.params;
        try {
            const cliente = await ClienteService.getClienteById(id);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.send('Erro ao buscar cliente');
            res.end();
        }
    }
    /**
     * Função para tratamento de erros na criação de cliente.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async createCliente(req, res) {
        const cliente = req.body;
        try {
            const id = await ClienteService.createCliente(cliente);
            res.status(201).json({ id });
        } catch (error) {
            res.send('Erro ao salvar cliente');
            res.end();
        }
    }
    /**
     * Função para tratamento de erros na atualização de cliente.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async updateCliente(req, res) {
        const { id } = req.params;
        const cliente = req.body;
        try {
            const result = await ClienteService.updateCliente(id, cliente);
            if (result) {
                res.json({ message: 'Cliente atualizado com sucesso' });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.send('Erro ao atualizar cliente');
            res.end();
        }
    }
    /**
     * Função para tratamento de erros ao deletar cliente do banco de dados.
     * @param {object} req - .
     * @param {object} res - .
     * @return {json} .
     */
    static async deleteCliente(req, res) {
        const { id } = req.params;
        try {
            const result = await ClienteService.deleteCliente(id);
            if (result) {
                res.json({ message: 'Cliente deletado com sucesso' });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.send('Erro ao deletar cliente');
            res.end();
        }
    }
}

module.exports = ClienteController;
