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

    /**
     * Calcule le nombre d'atody (œufs) qui deviennent des poussins à une date donnée.
     * 
     * Règles :
     * - Si date < date recensement + 31 jours → retourne le nombre brut d'ÉtatAtody
     * - Si date >= date recensement + 31 jours → retourne le nombre survivant après éclosion
     *   = nombre * (1 - percentLamokana de la race)
     *
     * @param {number} etatAtodyId   ID de l'enregistrement EtatAtody
     * @param {string} dateReference format 'YYYY-MM-DD'
     * @returns {Promise<number>} nombre d'atody / poussins à cette date
     */
    async getNombreAtodyEffectifs(etatAtodyId, dateReference) {
        // 1. Récupérer l'enregistrement EtatAtody
        const etat = await EtatAtodyRepository.findById(etatAtodyId);
        if (!etat) {
            throw new Error(`EtatAtody ${etatAtodyId} non trouvé`);
        }

        const nombreOeufs = etat.nombre;
        const dateRecensement = new Date(etat.date);

        // 2. Calculer la date d'éclosion prévue (+30j + 1j = +31 jours)
        const dateEclosion = new Date(dateRecensement);
        dateEclosion.setDate(dateEclosion.getDate() + 31);

        const dateRef = new Date(dateReference);

        // 3. Cas 1 : avant éclosion → on retourne le nombre brut
        if (dateRef < dateEclosion) {
            return nombreOeufs;
        }

        // 4. Cas 2 : après éclosion → calcul des survivants
        // Récupérer la race liée au lot → via Atody → Lot → Race
        const atody = await AtodyRepository.findById(etat.id_atody);
        if (!atody) throw new Error(`Atody ${etat.id_atody} non trouvé`);

        const lot = await LotRepository.findById(atody.id_lot);
        if (!lot) throw new Error(`Lot ${atody.id_lot} non trouvé`);

        const race = await RaceService.getRaceById(lot.id_race);
        if (!race) throw new Error(`Race ${lot.id_race} non trouvée`);

        const tauxPerte = race.getPercentLamokana() / 100; // ex: 0.15 pour 15%
        const tauxSurvie = 1 - tauxPerte;

        const nombreSurvivants = Math.round(nombreOeufs * tauxSurvie);

        return Math.max(0, nombreSurvivants);
    }

    /**
     * Version alternative : pour un lot entier (somme sur tous les EtatAtody du lot)
     */
    async getNombreAtodyEffectifsPourLot(lotId, dateReference) {
        // Récupérer tous les EtatAtody liés au lot (via Atody)
        const atodies = await AtodyRepository.findByLotId(lotId);
        if (!atodies || atodies.length === 0) return 0;

        let total = 0;

        for (const atody of atodies) {
            // Récupérer tous les états pour cet atody
            const etats = await EtatAtodyRepository.findByAtodyId(atody.id); // suppose que tu ajoutes cette méthode au repo si besoin
            for (const etat of etats) {
                const effectifs = await this.getNombreAtodyEffectifs(etat.id, dateReference);
                total += effectifs;
            }
        }

        return total;
    }
}

module.exports = new EtatAtodyService();
