const SituationService = require("../services/SituationService");

const AtodyService = require("../services/AtodyService");
const LotService = require("../services/LotService");



class LotController {

            static async getSituationGlobale(req, res) {
                const { date } = req.query;
                if (!date) {
                    return res.status(400).json({ error: 'Missing date parameter' });
                }
                try {
                    const situations = await SituationService.getSituation(date);
                    res.json({ situations });
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
        static async getEtatAtodyByLotId(req, res) {
            const { id_lot } = req.query;
            if (!id_lot) {
                return res.status(400).json({ error: 'Missing id_lot parameter' });
            }
            try {
                const data = await LotService.getEtatAtodyByLotId(id_lot);
                res.json({ etatAtody: data });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
    static async getRestCaapaciteAtody(req, res) {
        const { id, date } = req.query;
        if (!id || !date) {
            return res.status(400).json({ error: 'Missing id or date parameter' });
        }
        let normalizedDate = date;
        if (typeof date === 'string') {
            const d = new Date(date);
            if (!isNaN(d.getTime())) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                normalizedDate = `${year}-${month}-${day}`;
            }
        }
        try {
            const data = await AtodyService.getRestCaapaciteAtody(id, normalizedDate);
            res.json({ restCaapaciteAtody: data });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getSakafoLany(req, res) {
        const { id, date } = req.query;
        if (!id || !date) {
            return res.status(400).json({ error: 'Missing id or date parameter' });
        }
        // Normalisation du format de la date (YYYY-MM-DD)
        let normalizedDate = date;
        if (typeof date === 'string') {
            const d = new Date(date);
            if (!isNaN(d.getTime())) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                normalizedDate = `${year}-${month}-${day}`;
            }
        }
        try {
            const data = await LotService.getSakafoLany(id, normalizedDate);
            res.json({ sakafoLany: data });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getPoidsActuel(req, res) {
        const { id, date } = req.query;
        if (!id || !date) {
            return res.status(400).json({ error: 'Missing id or date parameter' });
        }
        let normalizedDate = date;
        if (typeof date === 'string') {
            const d = new Date(date);
            if (!isNaN(d.getTime())) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                normalizedDate = `${year}-${month}-${day}`;
            }
        }
        try {
            const data = await LotService.getPoidsActuel(id, normalizedDate);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAll(req, res) {
        const data = await LotService.getAll();
        res.json(data);
    }

    static async getById(req, res) {
        const data = await LotService.getById(req.params.id);
        res.json(data);
    }

    static async create(req, res) {
        await LotService.create(req.body);
        res.json({ message: "created" });
    }

    static async update(req, res) {
        await LotService.update(req.params.id, req.body);
        res.json({ message: "updated" });
    }


    static async getRestSexe(req, res) {
        const { id, date } = req.query;
        if (!id || !date) {
            return res.status(400).json({ error: 'Missing id or date parameter' });
        }
        try {
            const data = await LotService.getRestSexe(id, date);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getDateByNumeroSemaineEtJourAvecInitial(req, res) {
        const { id, numSemaine, numJour } = req.query;
        if (!id || numSemaine === undefined || numJour === undefined) {
            return res.status(400).json({ error: 'Missing id, numSemaine, or numJour parameter' });
        }
        try {
            const data = await LotService.getDateByNumeroSemaineEtJourAvecInitial(id, parseInt(numSemaine), parseInt(numJour));
            res.json({ date: data });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        await LotService.delete(req.params.id);
        res.json({ message: "deleted" });
    }

}

module.exports = LotController;
