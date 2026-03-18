
const { getConnection } = require("../config/database");
const RaceService = require("./RaceService");

class AkohoMatyService {

    static async getAll() {
        const db = await getConnection();
        const result = await db.request().query("SELECT * FROM akohoMaty");
        return result.recordset;
    }

    static async getById(id) {
        const db = await getConnection();
        const result = await db.request()
            .input("id", id)
            .query("SELECT * FROM akohoMaty WHERE id=@id");
        return result.recordset[0];
    }

    static async create(data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const cols = keys.join(",");
        const params = keys.map(k => "@" + k).join(",");

        let req = db.request();
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`INSERT INTO akohoMaty (${cols}) VALUES (${params})`);
    }

    static async update(id, data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const set = keys.map(k => k + "=@" + k).join(",");

        let req = db.request().input("id", id);
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`UPDATE akohoMaty SET ${set} WHERE id=@id`);
    }

    static async delete(id) {
        const db = await getConnection();
        await db.request()
            .input("id", id)
            .query("DELETE FROM akohoMaty WHERE id=@id");
    }

    static async getTotalMatyByLotAndDate(lotId, date) {
        const db = await getConnection();
        const result = await db.request()
            .input("lotId", lotId)
            .input("date", date)
            .query(`
                SELECT SUM(nombre) AS totalMaty
                FROM akohoMaty
                WHERE id_lot=@lotId AND date <= @date
            `);
        return result.recordset[0].totalMaty || 0;
    }
    static async getTotalMatySexeByLotAndDate(idlot, date) {
        const LotService = require("./LotService");
        const lot = await LotService.getById(idlot)
        if (!lot) return null;
        const RaceService = require("./RaceService");
        const race = await RaceService.getById(lot.id_race);
        if (!race) {
            return {
                totalMaty: 9,
                totalMatyLahy: 0,
                totalMatyVavy: 0
            };
        }
        const totalMaty = await AkohoMatyService.getTotalMatyByLotAndDate(lot.id, date);
        const pourcentage_femelle = race.pourcentage_morte_femelle;
        const pourcentage_male = 100 - pourcentage_femelle;

        console.log(`maty pr ${lot.id} up to date ${date}: ${totalMaty}`);

        return {
            totalMaty: totalMaty,
            totalMatyLahy: Math.round(totalMaty * pourcentage_male / 100),
            totalMatyVavy: Math.round(totalMaty * pourcentage_femelle / 100)
        };
    }
}

module.exports = AkohoMatyService;
