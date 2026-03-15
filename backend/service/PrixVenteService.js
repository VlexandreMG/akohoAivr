const PrixVenteRepository = require('../repositories/PrixVenteRepository');
const PrixVente = require('../models/PrixVente');

class PrixVenteService {
    async create(data) { return await PrixVenteRepository.create(data); }
    async getAll() { return await PrixVenteRepository.findAll(); }
    async getById(id) { return await PrixVenteRepository.findById(id); }
    async update(data) { 
        const payload = (data && typeof data.getId === 'function') ? data : new PrixVente(data.id, data.id_race, data.prix_akoho_g, data.prix_atody_unitaire);
        return await PrixVenteRepository.update(payload);
    }
    async delete(id) { return await PrixVenteRepository.delete(id); }
}

module.exports = new PrixVenteService();
