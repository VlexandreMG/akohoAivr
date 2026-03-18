
const PrixSakafoService = require("../services/PrixSakafoService");

class PrixSakafoController {

    static async getAll(req, res) {
        const data = await PrixSakafoService.getAll();
        res.json(data);
    }

    static async getById(req, res) {
        const data = await PrixSakafoService.getById(req.params.id);
        res.json(data);
    }

    static async create(req, res) {
        await PrixSakafoService.create(req.body);
        res.json({ message: "created" });
    }

    static async update(req, res) {
        await PrixSakafoService.update(req.params.id, req.body);
        res.json({ message: "updated" });
    }

    static async delete(req, res) {
        await PrixSakafoService.delete(req.params.id);
        res.json({ message: "deleted" });
    }

}

module.exports = PrixSakafoController;
