const PrixAchatRepository = require('../repositories/PrixAchatRepository');
const PrixAchat = require('../models/PrixAchat');

class PrixAchatService {
    async create(data) { return await PrixAchatRepository.create(data); }
    async getAll() { return await PrixAchatRepository.findAll(); }
    async getById(id) { return await PrixAchatRepository.findById(id); }
    async update(data) { 
        const payload = (data && typeof data.getId === 'function') ? data : new PrixAchat(data.id, data.id_race, data.semaine_initial, data.prix_akoho_unitaire, data.prix_atody_unitaire);
        return await PrixAchatRepository.update(payload);
    }
    async delete(id) { return await PrixAchatRepository.delete(id); }
}

module.exports = new PrixAchatService();
