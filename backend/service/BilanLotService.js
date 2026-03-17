// services/BilanLotService.js
const AkohoMatyService = require('./AkohoMatyService');
// Ajouter les autres services au fur et à mesure

class BilanLotService {
    /**
     * Exemple d'utilisation simple : récupérer le nombre de poulets vivants
     * @param {number} lotId 
     * @param {string} date 
     */
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

    // Plus tard, quand on aura plusieurs métriques, on pourra faire :
    // async getBilanEssentiel(lotId, date) {
    //   const vivants = await AkohoMatyService.getNombrePouletsVivants(lotId, date);
    //   const oeufs   = await AtodyService.getTotalOeufsCumules(lotId, date);
    //   return { vivants, oeufs, ... };
    // }
}

module.exports = new BilanLotService();