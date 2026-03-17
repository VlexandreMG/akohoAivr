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

    /**
     * Calcule la valeur totale estimée à la vente du lot à une date donnée
     * = poids moyen estimé (kg ou g) × nombre de poulets vivants × prix_akoho_g
     *
     * @param {number} lotId
     * @param {string} date format 'YYYY-MM-DD'
     * @returns {Promise<number>} Valeur totale en Ariary
     */
    async getValeurVenteEstimee(lotId, date) {
        // 1. Récupérer le prix_akoho_g pour la race du lot
        const lot = await LotRepository.findById(lotId);
        if (!lot) throw new Error(`Lot ${lotId} non trouvé`);

        const prixVente = await PrixVenteRepository.findByRaceId(lot.id_race);
        if (!prixVente || !prixVente.prix_akoho_g) {
            return 0; // Pas de prix connu → valeur nulle
        }

        const prixParKg = prixVente.prix_akoho_g;   // ← ou prix par gramme, à confirmer

        // 2. Poids moyen estimé (en kg)
        const poidsMoyenGr = await EquivalenceService.getPoidsMoyenEstime(lotId, date);
        if (poidsMoyenGr <= 0) return 0;

        const poidsMoyenKg = poidsMoyenGr / 1000;   // Si ton prix est par kg
        // Si prix_akoho_g est par gramme → commente la ligne ci-dessus et utilise :
        // const poidsMoyenKg = poidsMoyenGr;

        // 3. Nombre de poulets vivants
        const nbPouletsVivants = await AkohoMatyService.getNombrePouletsVivants(lotId, date);

        // 4. Calcul final
        const valeurTotale = nbPouletsVivants * poidsMoyenKg * prixParKg;

        return Math.round(valeurTotale);
    }

    async getValeurAtodyEstimee(lotId, date) {
        // 1. Récupérer le nombre d'atody effectifs à cette date (pour tout le lot)
        const nombreAtody = await EtatAtodyService.getNombreAtodyEffectifsPourLot(lotId, date);
        if (nombreAtody <= 0) {
            return 0;
        }

        // 2. Récupérer le prix unitaire de l'œuf pour la race du lot
        const lot = await LotRepository.findById(lotId);
        if (!lot) {
            throw new Error(`Lot ${lotId} non trouvé`);
        }

        const prixVente = await PrixVenteRepository.findByRaceId(lot.id_race);
        if (!prixVente || !prixVente.prix_atody_unitaire) {
            return 0; // Pas de prix connu → valeur nulle
        }

        const prixUnitaireOeuf = prixVente.prix_atody_unitaire;

        // 3. Calcul final
        const valeurTotale = nombreAtody * prixUnitaireOeuf;

        return Math.round(valeurTotale);
    }
}

module.exports = new PrixVenteService();
