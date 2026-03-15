const AtodyRepository = require('../repositories/AtodyRepository');
const Atody = require('../models/Atody');

class AtodyService {
    async create(data) { return await AtodyRepository.create(data); }
    async getAll() { return await AtodyRepository.findAll(); }
    async getById(id) { return await AtodyRepository.findById(id); }
    async update(data) { 
        const payload = (data && typeof data.getId === 'function') ? data : new Atody(data.id, data.id_lot, data.nombre, data.date);
        return await AtodyRepository.update(payload);
    }
    async getByLotId(lotId) { return await AtodyRepository.findByLotId(lotId); }
    async getTotalAtodyByLotAndDate(lotId, date) { return await AtodyRepository.getTotalAtodyByLotAndDate(lotId, date); }
    async delete(id) { return await AtodyRepository.delete(id); }
}

module.exports = new AtodyService();
