const ClienteService = require('../services/ClienteService');
/** Class representing a point. */
class ClienteController {
    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
     * Convert a string containing two comma-separated numbers into a point.
     * @param {object} req - The string containing.
     * @param {object} res - The string containing.
     * @return {json} A Point object.
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
