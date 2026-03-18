
const { getConnection } = require("../config/database");

class EquivalenceService {

    static async getAll() {
        const db = await getConnection();
        const result = await db.request().query("SELECT * FROM equivalence");
        return result.recordset;
    }

    static async getById(id) {
        const db = await getConnection();
        const result = await db.request()
            .input("id", id)
            .query("SELECT * FROM equivalence WHERE id=@id");
        return result.recordset[0];
    }

    static async create(data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const cols = keys.join(",");
        const params = keys.map(k => "@" + k).join(",");

        let req = db.request();
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`INSERT INTO equivalence (${cols}) VALUES (${params})`);
    }

    static async update(id, data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const set = keys.map(k => k + "=@" + k).join(",");

        let req = db.request().input("id", id);
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`UPDATE equivalence SET ${set} WHERE id=@id`);
    }

    static async delete(id) {
        const db = await getConnection();
        await db.request()
            .input("id", id)
            .query("DELETE FROM equivalence WHERE id=@id");
    }

    static async getEquivalenceByIdRace(raceId) {
        const db = await getConnection();
        const result = await db.request()
            .input("raceId", raceId)
            .query("SELECT * FROM equivalence WHERE id_race=@raceId ORDER BY numero_semaine ASC");
        return result.recordset;
    }

    static async getEquivalenceByRaceIdDepuitSemaine(raceId, depuisSemaine) {
        const db = await getConnection();
        const result = await db.request()
            .input("raceId", raceId)
            .input("depuisSemaine", depuisSemaine)
            .query(`
                SELECT *
                FROM equivalence
                WHERE id_race=@raceId AND numero_semaine >= @depuisSemaine
                ORDER BY numero_semaine ASC
            `);
        return result.recordset;
    }

}

module.exports = EquivalenceService;
