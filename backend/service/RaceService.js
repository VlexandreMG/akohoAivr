const RaceRepository = require('../repositories/RaceRepository');
const Race = require('../models/Race');

class RaceService {
    async getAllRaces() {
        const rows = await RaceRepository.findAll();
        return rows.map(r => new Race(r.id, r.nom));
    }

    async getRaceById(id) {
        const row = await RaceRepository.findById(id);
        if (!row) return null;
        return new Race(row.id, row.nom);
    }

    async createRace(data) {
        return await RaceRepository.create(data);
    }

    async updateRace(data) {
        const payload = (data && typeof data.getId === 'function') ? data : new Race(data.id, data.nom);
        return await RaceRepository.update(payload);
    }

    async deleteRace(id) {
        return await RaceRepository.delete(id);
    }
}

module.exports = new RaceService();
