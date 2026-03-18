
const EtatAtodyService = require("../services/EtatAtodyService");

class EtatAtodyController {

    static async createEtatAtody(req, res) {
        try {
            const { id_lot, type, nombre, date } = req.body;
            if (!id_lot || !type || !nombre || !date) {
                return res.status(400).json({ error: 'Missing id_lot, type, nombre, or date parameter' });
            }
            const result = await EtatAtodyService.simulation30jours(id_lot, type, nombre, date);
            res.status(201).json({ message: 'EtatAtody créé', result });
        } catch (err) {
            console.error('[CONTROLLER] createEtatAtody error:', err);
            res.status(500).send(err.message);
        }
    }


    static async getAll(req, res) {
        const data = await EtatAtodyService.getAll();
        res.json(data);
    }
    static formatDateForSQL(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    static async getById(req, res) {
        const data = await EtatAtodyService.getById(req.params.id);
        res.json(data);
    }

    static async create(req, res) {
        await EtatAtodyService.create(req.body);
        res.json({ message: "created" });
    }

    static async update(req, res) {
        await EtatAtodyService.update(req.params.id, req.body);
        res.json({ message: "updated" });
    }

    static async delete(req, res) {
        await EtatAtodyService.delete(req.params.id);
        res.json({ message: "deleted" });
    }

    static async getRest(req, res) {
        const { id, date } = req.params;
        try {
            const rest = await EtatAtodyService.resteAtody(id, date);
            res.json({ id, date, rest });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

module.exports = EtatAtodyController;
