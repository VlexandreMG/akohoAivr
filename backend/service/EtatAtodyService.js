const EtatAtodyRepository = require('../repositories/EtatAtodyRepository');
const EtatAtody = require('../models/EtatAtody');

class EtatAtodyService {
    async create(data) { return await EtatAtodyRepository.create(data); }
    async getAll() { return await EtatAtodyRepository.findAll(); }
    async getById(id) { return await EtatAtodyRepository.findById(id); }
    async update(data) { 
        const payload = (data && typeof data.getId === 'function') ? data : new EtatAtody(data.id, data.id_atody, data.type, data.nombre, data.date);
        return await EtatAtodyRepository.update(payload);
    }
    async delete(id) { return await EtatAtodyRepository.delete(id); }
}

module.exports = new EtatAtodyService();
