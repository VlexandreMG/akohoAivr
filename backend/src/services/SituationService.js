

class SituationService {
    static async getSituation(date) {
        const LotService = require("./LotService");
        const lots = await LotService.getAllinfDate(date);
        const situations = [];
        for (const lot of lots) {
            const situation = await LotService.getSituation(lot.id, date);
            situations.push(situation);
        }
        return situations;
    }
}

module.exports = SituationService;