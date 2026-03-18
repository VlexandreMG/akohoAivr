
const { getConnection } = require("../config/database");
const EquivalenceService = require("./EquivalenceService");
const Utilitaire = require("./Utilitaire");

class RaceService {

    static async getAll() {
        const db = await getConnection();
        const result = await db.request().query("SELECT * FROM race");
        return result.recordset;
    }

    static async getById(id) {
        const db = await getConnection();
        const result = await db.request()
            .input("id", id)
            .query("SELECT * FROM race WHERE id=@id");
        return result.recordset[0];
    }

    static async create(data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const cols = keys.join(",");
        const params = keys.map(k => "@" + k).join(",");

        let req = db.request();
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`INSERT INTO race (${cols}) VALUES (${params})`);
    }

    static async update(id, data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const set = keys.map(k => k + "=@" + k).join(",");

        let req = db.request().input("id", id);
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`UPDATE race SET ${set} WHERE id=@id`);
    }

    static async delete(id) {
        const db = await getConnection();
        await db.request()
            .input("id", id)
            .query("DELETE FROM race WHERE id=@id");
    }

    static async getPoidsTotal(id_race, date_debut, date_fin) {
        const equivalence = await EquivalenceService.getEquivalenceByIdRace(id_race);

        if (!equivalence || equivalence.length === 0) return 0;

        let poidsTotal = 0;
        let stop = false;
        const dateDebutNorm = await Utilitaire.normalizeDate(date_debut);
        const dateFinNorm = await Utilitaire.normalizeDate(date_fin);
        let countSemaines = 0;
        let countJours = 0;
        let differenceJours = (dateFinNorm - dateDebutNorm) / (1000 * 60 * 60 * 24);
        console.log('Difference en jours:', differenceJours);

        for (let i = 0; i < equivalence.length && !stop; i++) {
            const eq = equivalence[i];
            for (let j = 1; j <= 7; j++) {
                differenceJours--;
                if (differenceJours < 0) {
                    stop = true;
                    countSemaines = eq.numero_semaine + 1;
                    countJours = j;
                    break;

                }
            }
        }
        console.log('semaine:', countSemaines);

        for (let i = 0; i < countSemaines; i++) {
            const eq = equivalence[i];
            if (eq) {
                poidsTotal += eq.poids;
            }
        }
        const eq = equivalence[countSemaines];
        if (eq) {
            const poidsParJour = eq.poids / 7;
            poidsTotal += poidsParJour * countJours;
        }
        return poidsTotal;
    }

}

module.exports = RaceService;
