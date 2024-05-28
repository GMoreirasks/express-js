const ClienteService = require('../services/clienteService');

class ClienteController {
    static async getAllClientes(req, res) {
        try {
            const clientes = await ClienteService.getAllClientes();
            res.json(clientes);
        } catch (error) {
            res.send(error);
            res.end();
        }
    }

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
            res.send("Erro ao buscar cliente");
            res.end();
        }
    }

    static async createCliente(req, res) {
        const cliente = req.body;
        try {
            const id = await ClienteService.createCliente(cliente);
            res.status(201).json({ id });
        } catch (error) {
            res.send("Erro ao salvar cliente");
            res.end();
        }
    }

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
            res.send("Erro ao atualizar cliente");
            res.end();
        }
    }

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
            res.send("Erro ao deletar cliente");
            res.end();
        }
    }
}

module.exports = ClienteController;
