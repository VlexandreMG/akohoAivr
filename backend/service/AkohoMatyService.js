const AkohoMatyRepository = require('../repositories/AkohoMatyRepository');
const AkohoMaty = require('../models/AkohoMaty');

class AkohoMatyService {
    async create(data) { return await AkohoMatyRepository.create(data); }
    async getAll() { return await AkohoMatyRepository.findAll(); }
    async getById(id) { return await AkohoMatyRepository.findById(id); }
    async update(data) { 
        const payload = (data && typeof data.getId === 'function') ? data : new AkohoMaty(data.id, data.id_lot, data.nombre, data.date, data.cause);
        return await AkohoMatyRepository.update(payload);
    }
    async delete(id) { return await AkohoMatyRepository.delete(id); }

    //Nb d'akoho vivant restant. 
    // @param {number} lotId
    // @param {string} date
    async getNombrePouletsVivants(lotId, date) { return await AkohoMatyRepository.getNombrePouletsVivants(lotId, date); }
    async getNombrePouletsMortsCumules(lotId, date) { return await AkohoMatyRepository.getNombrePouletsMortsCumules(lotId, date); }
}

module.exports = new AkohoMatyService();

