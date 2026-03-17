// services/EquivalenceService.js
const EquivalenceRepository = require('../repositories/EquivalenceRepository');
const LotRepository = require('../repositories/LotRepository'); // pour récupérer la date de début et semaine initiale
const Equivalence = require('../models/Equivalence');

class EquivalenceService {
    async create(data) {
        return await EquivalenceRepository.create(data);
    }

    async getAll() {
        return await EquivalenceRepository.findAll();
    }

    async getById(id) {
        return await EquivalenceRepository.findById(id);
    }

    async update(data) {
        const payload = (data && typeof data.getId === 'function')
            ? data
            : new Equivalence(
                data.id,
                data.numero_semaine,
                data.id_race,
                data.poids,
                data.sakafo,
                data.prixSakafo
            );
        return await EquivalenceRepository.update(payload);
    }

    async delete(id) {
        return await EquivalenceRepository.delete(id);
    }

    /**
     * Calcule le poids moyen estimé d'un poulet d'un lot à une date donnée,
     * avec interpolation linéaire pour les jours partiels dans la semaine en cours.
     *
     * Exemple :
     * - Semaine 1 : 400 g (fin de semaine 1)
     * - Semaine 2 : 650 g (fin de semaine 2)
     * - Date : 12 mars → 5 jours dans la semaine 2
     * → poids = 400 + (5 * (650 - 400)) / 7
     *
     * @param {number} lotId
     * @param {string} date format 'YYYY-MM-DD'
     * @returns {Promise<number>} poids moyen estimé en grammes
     */
    async getPoidsMoyenEstime(lotId, date) {
        // 1. Récupérer les infos du lot (date de début + semaine initiale)
        const lot = await LotRepository.findById(lotId);
        if (!lot) {
            throw new Error(`Lot ${lotId} non trouvé`);
        }

        const dateDebut = new Date(lot.daty);
        const dateRef = new Date(date);

        if (dateRef < dateDebut) {
            return 0; // ou throw error selon ta règle
        }

        // 2. Calculer le nombre total de jours écoulés
        const diffMs = dateRef - dateDebut;
        const joursEcoules = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        // 3. Calculer la semaine actuelle (entière) + jours dans la semaine courante
        const semainesEntieres = Math.floor(joursEcoules / 7);
        const joursDansSemaineCourante = joursEcoules % 7;

        const semaineCible = semainesEntieres + (lot.semaine_initial || 0);

        // 4. Récupérer toutes les équivalences pour cette race, triées par semaine
        const equivalences = await EquivalenceRepository.findByRaceId(lot.id_race);
        if (!equivalences || equivalences.length === 0) {
            return 0; // ou valeur par défaut / erreur
        }

        equivalences.sort((a, b) => a.numero_semaine - b.numero_semaine);

        // 5. Trouver le poids à la fin de la semaine précédente
        let poidsSemainePrecedente = 0;
        let semainePrecedenteTrouvee = false;

        for (const eq of equivalences) {
            if (eq.numero_semaine < semaineCible) {
                poidsSemainePrecedente = eq.poids || 0;
                semainePrecedenteTrouvee = true;
            } else if (eq.numero_semaine === semaineCible) {
                // On a la cible → on peut interpoler
                const poidsFinSemaine = eq.poids || 0;
                const gainSemaine = poidsFinSemaine - poidsSemainePrecedente;

                const poidsJour = gainSemaine / 7;
                const poidsAjoute = joursDansSemaineCourante * poidsJour;

                return Math.round(poidsSemainePrecedente + poidsAjoute); // en grammes
            }
        }

        // Si on n'a pas trouvé la semaine cible exacte → on prend le dernier poids connu
        if (semainePrecedenteTrouvee) {
            return Math.round(poidsSemainePrecedente);
        }

        // Sinon → premier poids connu ou 0
        return equivalences[0]?.poids || 0;
    }
}

module.exports = new EquivalenceService();