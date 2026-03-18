
const { getConnection, executeQuery } = require("../config/database");
const AtodyService = require("./AtodyService");
const RaceService = require("./RaceService");

const sql = require("mssql");
const Utilitaire = require("./Utilitaire");



class EtatAtodyService {

    static async getEtatAtodyByLotId(id_lot) {
        const db = await getConnection();
        const result = await db.request()
            .input("id_lot", id_lot)
            .query("SELECT * FROM etatAtody WHERE id_lot=@id_lot");
        return result.recordset;
    }
    static async createEtatAtody(id_lot, type, nombre, date) {
        const { executeQuery } = require("../config/database");
        const params = {
            id_lot: Number(id_lot),
            type: type,
            nombre: Number(nombre),
            date: date
        };
        const result = await executeQuery(
            `INSERT INTO etatAtody (id_lot, type, nombre, date)
             OUTPUT INSERTED.*
             VALUES (@id_lot, @type, @nombre, @date)`,
            params
        );
        return result.recordset[0];
    }

    static async getAll() {
        const db = await getConnection();
        const result = await db.request().query("SELECT * FROM etatAtody");
        return result.recordset;
    }

    static async getById(id) {
        const db = await getConnection();
        const result = await db.request()
            .input("id", id)
            .query("SELECT * FROM etatAtody WHERE id=@id");
        return result.recordset[0];
    }




    static async update(id, data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const set = keys.map(k => k + "=@" + k).join(",");

        let req = db.request().input("id", id);
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`UPDATE etatAtody SET ${set} WHERE id=@id`);
    }

    static async delete(id) {
        const db = await getConnection();
        await db.request()
            .input("id", id)
            .query("DELETE FROM etatAtody WHERE id=@id");
    }

    static async getTotalAtodyByLotAndDate(lotId, date) {
        const db = await getConnection();
        const result = await db.request()
            .input("lotId", lotId)
            .input("date", date)
            .query(`
                SELECT SUM(nombre) AS totalAtody
                FROM etatAtody
                WHERE id_lot=@lotId AND date <= @date
            `);
        return result.recordset[0].totalAtody || 0;
    }
    static async simulation30jours(id_lot, type, nombre, date) {
        const LotService = require("./LotService");

        const AtodyService = require("./AtodyService");
        const restAtody = await AtodyService.getRestCapaciteAtody(id_lot, date);

        if (type === 'fohy' && nombre > restAtody) {
            return false;
        }

        const result = await this.createEtatAtody(id_lot, type, nombre, date);

        if (result) {

            const lot = await LotService.getById(id_lot);
            const race = await RaceService.getById(lot.id_race);

            const pourcentage_morte_atody = race.pourcentage_morte_atody || 0;

            let nombre_fohy = Math.floor(
                nombre - nombre * (pourcentage_morte_atody / 100)
            );

            console.log("Nombre zanaka:", nombre_fohy);

            if (nombre_fohy > 0) {

                const date_apres30jours = new Date(date);
                date_apres30jours.setDate(
                    date_apres30jours.getDate() + race.temps_pondaison+1
                );

                const datyValue = date_apres30jours.toISOString().split("T")[0];

                const ok = await LotService.createZanakaLot(
                    `zanaka_${lot.nom}`,
                    nombre_fohy,
                    datyValue,
                    lot.id_race,
                    lot.semaine_initial,
                    "atody"
                );

                return ok;

            } else {

                return {
                    message: "Aucun lot zanaka créé",
                    nombre_fohy
                };

            }
        }

        return result;
    }

    static async resteAtody(idEtatAtody, date) {
        const LotService = require("./LotService");

        const etatAtody = await EtatAtodyService.getById(idEtatAtody);
        if (!etatAtody) return null;

        if (etatAtody.type !== 'fohy') return 0;

        const lot = await LotService.getById(etatAtody.id_lot);
        if (!lot) return null;

        const race = await RaceService.getById(lot.id_race);
        if (!race) return null;

        const dateDebut = new Date(etatAtody.date);
        dateDebut.setHours(0, 0, 0, 0);

        const dateFin = new Date(dateDebut);
        dateFin.setDate(dateFin.getDate() + race.temps_pondaison);

        const dateCheck = new Date(date);
        dateCheck.setHours(0, 0, 0, 0);

        if (dateCheck >= dateDebut && dateCheck < dateFin) {
            return etatAtody.nombre;
        }

        return 0;
    }




}

module.exports = EtatAtodyService;
