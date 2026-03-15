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
    async getTotalMatyByLotAndDate(lotId, date) { return await AkohoMatyRepository.getTotalMatyByLotAndDate(lotId, date); }
    async delete(id) { return await AkohoMatyRepository.delete(id); }
}

module.exports = new AkohoMatyService();

