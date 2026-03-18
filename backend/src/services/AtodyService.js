
const { getConnection } = require("../config/database");
const AkohoMatyService = require("./AkohoMatyService");
const RaceService = require("./RaceService");

const EtatAtodyService = require("./EtatAtodyService");

class AtodyService {

    static async getAll() {
        const db = await getConnection();
        const result = await db.request().query("SELECT * FROM atody");
        return result.recordset;
    }

    static async getById(id) {
        const db = await getConnection();
        const result = await db.request()
            .input("id", id)
            .query("SELECT * FROM atody WHERE id=@id");
        return result.recordset[0];
    }

    static async create(data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const cols = keys.join(",");
        const params = keys.map(k => "@" + k).join(",");

        let req = db.request();
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`INSERT INTO atody (${cols}) VALUES (${params})`);
    }

    static async update(id, data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const set = keys.map(k => k + "=@" + k).join(",");

        let req = db.request().input("id", id);
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`UPDATE atody SET ${set} WHERE id=@id`);
    }

    static async delete(id) {
        const db = await getConnection();
        await db.request()
            .input("id", id)
            .query("DELETE FROM atody WHERE id=@id");
    }

    static async getRestCapaciteAtody(lotId, date) {
          const LotService = require("./LotService");
        const lot = await LotService.getById(lotId);
        if (!lot) return null;
        const race = await RaceService.getById(lot.id_race);
        if (!race) return null;
        const sommeAtody = await EtatAtodyService.getTotalAtodyByLotAndDate(lotId, date);
        const maty = await AkohoMatyService.getTotalMatySexeByLotAndDate(lotId, date);
        const sipaMaty = maty.totalMatyVavy || 0;
        console.log(`Total maty vavy for lot ${lot.id} up to date ${date}: ${sipaMaty}`);
        return (lot.nombre * race.pourcentage_femelle / 100 - sipaMaty) * race.capacite_pondaison - sommeAtody;
    }
  



}

module.exports = AtodyService;
