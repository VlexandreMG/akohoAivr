const LotRepository = require('../repositories/LotRepository');
const Lot = require('../models/Lot');
const AkohoMatyService = require('./AkohoMatyService');

class LotService {
    async create(data) { return await LotRepository.create(data); }
    async getAll() { return await LotRepository.findAll(); }
    async getById(id) { return await LotRepository.findById(id); }
    async update(data) {
        const payload = (data && typeof data.getId === 'function') ? data : new Lot(data.id, data.nom, data.nombre, data.daty, data.origine, data.id_race, data.semaine_initial);
        return await LotRepository.update(payload);
    }
    async delete(id) { return await LotRepository.delete(id); }
    async getByRaceId(id) { return await LotRepository.findByRaceId(id); }
    // Helper methods migrated from services/lotService.js
    async getLotById(lotId) { return await LotRepository.findRawById(lotId); }

    async getLotWithRaceById(lotId) { return await LotRepository.findById(lotId); }

    async getNumeroSemaineEtJour(lotId, date) {
        const lot = await this.getLotById(lotId);
        if (!lot) return null;

        const dateDebut = normalizeDate(lot.daty);
        const dateCible = normalizeDate(date);

        return calculateWeekAndDay(dateDebut, dateCible);
    }

    async getDateByNumeroSemaineEtJour(lotId, numSemaine, numJour) {
        const lot = await this.getLotById(lotId);
        if (!lot) return null;

        const { numSemaine: semaine, numJour: jour } = validateWeekAndDay(numSemaine, numJour);
        const dateDebut = normalizeDate(lot.daty);
        const dateResult = calculateDateFromWeekAndDay(dateDebut, semaine, jour);

        return {
            lot_id: lot.id,
            lot_nom: lot.nom,
            date_debut: lot.daty,
            numero_semaine: semaine,
            numero_jour: jour,
            date: formatDate(dateResult)
        };
    }

    async getResteVivants(lotId, date) {
        const lot = await this.getLotById(lotId);
        if (!lot) return null;

        const dateDebut = normalizeDate(lot.daty);
        const dateCible = normalizeDate(date);

        if (dateCible < dateDebut) {
            return {
                reste_vivants: 0,
                numero_semaine_et_jour: { numero_semaine: 0, numero_jour: 0 },
                date_by_numero_semaine_et_jour: null
            };
        }

        const totalMaty = await AkohoMatyService.getTotalMatyByLotAndDate(lotId, date);
        const resteVivants = Math.max(lot.nombre - totalMaty, 0);

        const weekDayInfo = calculateWeekAndDay(dateDebut, dateCible);
        const dateInfo = await this.getDateByNumeroSemaineEtJour(lotId, weekDayInfo.numero_semaine, weekDayInfo.numero_jour);

        return {
            reste_vivants: resteVivants,
            numero_semaine_et_jour: weekDayInfo,
            date_by_numero_semaine_et_jour: dateInfo
        };
    }

    async getDateInitiale(lotId, numeroSemaine) {
        const lot = await this.getLotById(lotId);
        if (!lot) return null;

        const dateLot = normalizeDate(lot.daty);
        
        let dateInitiale;
        
        if (numeroSemaine === 0) {
            dateInitiale = new Date(
                dateLot.getFullYear(),
                dateLot.getMonth(),
                dateLot.getDate() + 1
            );
        } else {
            dateInitiale = new Date(
                dateLot.getFullYear(),
                dateLot.getMonth(),
                dateLot.getDate() - ((numeroSemaine - 1) * 7)
            );
        }

        return dateInitiale;
    }
}

module.exports = new LotService();
