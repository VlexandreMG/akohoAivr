const EquivalenceRepository = require('../repositories/EquivalenceRepository');
const Equivalence = require('../models/Equivalence');

class EquivalenceService {
    async create(data) { return await EquivalenceRepository.create(data); }
    async getAll() { return await EquivalenceRepository.findAll(); }
    async getById(id) { return await EquivalenceRepository.findById(id); }
    async update(data) {
        const payload = (data && typeof data.getId === 'function') ? data : new Equivalence(data.id, data.numero_semaine || data.semaine, data.id_race, data.poids, data.sakafo);
        return await EquivalenceRepository.update(payload);
    }
    async getByRaceId(raceId) { return await EquivalenceRepository.findByRaceId(raceId); }
    async delete(id) { return await EquivalenceRepository.delete(id); }
}

module.exports = new EquivalenceService();
