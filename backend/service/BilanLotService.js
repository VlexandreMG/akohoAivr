// services/BilanLotService.js
const AkohoMatyService = require('./AkohoMatyService');
const LotRepository = require('../repositories/LotRepository');
// Ajouter les autres services au fur et à mesure

class BilanLotService {
    /**
     * Exemple d'utilisation simple : récupérer le nombre de poulets vivants
     * @param {number} lotId 
     * @param {string} date 
     */

    async getPrixAchat(lotId) {
        const lot = await LotRepository.findById(lotId);
        if (!lot) {
            throw new Error(`Lot ${lotId} non trouvé`);
        }

        // On retourne le champ tel quel (il est déjà le total pour le lot)
        return lot.prix_achat || 0;
    }

    async getNombrePouletsVivants(lotId, date) {
        return await AkohoMatyService.getNombrePouletsVivants(lotId, date);
    }

    async getNombrePouletsMortsCumules(lotId, date) {
        return await AkohoMatyService.getNombrePouletsMortsCumules(lotId, date);
    }

    async getPoidsMoyenEstime(lotId, date) {
        return await EquivalenceService.getPoidsMoyenEstime(lotId, date);
    }

    async getCoutSakafoEstime(lotId, date) {
        return await EquivalenceService.getCoutSakafoEstime(lotId, date);
    }

    async getPrixDeVente(lotId, date) {
        return await PrixVenteService.getValeurVenteEstimee(lotId, date);
    }

    async getNombreAtodyEffectifs(lotId, date) {
        return await EtatAtodyService.getNombreAtodyEffectifsPourLot(lotId, date);
    }

    // Si tu veux pour un seul EtatAtody (moins courant)
    async getNombreAtodyPourEtat(etatId, date) {
        return await EtatAtodyService.getNombreAtodyEffectifs(etatId, date);
    }

    async getValeurAtody(lotId, date) {
        return await PrixVenteService.getValeurAtodyEstimee(lotId, date);
    }

    async getBeneficeNet(lotId, date) {
        // 1. Prix de vente (valeur des poulets vivants)
        const prixVente = await PrixVenteService.getValeurVenteEstimee(lotId, date);

        // 2. Valeur atody (valeur des œufs)
        const valeurAtody = await PrixVenteService.getValeurAtodyEstimee(lotId, date);

        // 3. Prix d'achat total du lot
        const lot = await LotRepository.findById(lotId);
        if (!lot) {
            throw new Error(`Lot ${lotId} non trouvé`);
        }

        // Attention : prix_achat est-il par poulet ou total pour le lot ?
        // On suppose ici que c'est le prix TOTAL pour le lot entier
        const prixAchatTotal = lot.prix_achat || 0;

        // Variante si prix_achat est par poulet → décommente et adapte :
        // const prixAchatTotal = lot.prix_achat * lot.nombre;

        // 4. Coût sakafo estimé
        const coutSakafo = await EquivalenceService.getCoutSakafoEstime(lotId, date);

        // 5. Calcul final du bénéfice
        const revenus = prixVente + valeurAtody;
        const couts = prixAchatTotal + coutSakafo;

        const beneficeNet = revenus - couts;

        return Math.round(beneficeNet);
    }


    // Plus tard, quand on aura plusieurs métriques, on pourra faire :
    // async getBilanEssentiel(lotId, date) {
    //   const vivants = await AkohoMatyService.getNombrePouletsVivants(lotId, date);
    //   const oeufs   = await AtodyService.getTotalOeufsCumules(lotId, date);
    //   return { vivants, oeufs, ... };
    // }
}

module.exports = new BilanLotService();