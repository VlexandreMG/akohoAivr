const express = require('express');
const BilanLotService = require('../service/BilanLotService');
const router = express.Router();

router.get('/bilan/lot/:lotId', async (req, res) => {
    const { lotId } = req.params;
    const { date } = req.query; // optionnel, sinon aujourd'hui

    try {
        const bilan = {
            date: date || new Date().toISOString().split('T')[0],
            nombrePouletsVivants: await BilanLotService.getNombrePouletsVivants(lotId, date),
            nombreMorts: await BilanLotService.getNombrePouletsMortsCumules(lotId, date),
            prixAchat: await BilanLotService.getPrixAchat(lotId),
            poidsMoyen: await BilanLotService.getPoidsMoyenEstime(lotId, date),
            coutSakafo: await BilanLotService.getCoutSakafoEstime(lotId, date),
            valeurVentePoulets: await BilanLotService.getPrixDeVente(lotId, date),
            nombreatody: await BilanLotService.getNombreAtodyEffectifs(lotId, date),
            valeurOeufs: await BilanLotService.getValeurAtody(lotId, date),
            beneficeNet: await BilanLotService.getBeneficeNet(lotId, date),
            
            // + tous les autres que tu veux
        };

        res.json(bilan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
