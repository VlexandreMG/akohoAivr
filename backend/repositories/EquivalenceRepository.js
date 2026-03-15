const db = require('../database/db');

class EquivalenceRepository {
    async create({ numero_semaine, id_race, poids, sakafo }) {
        const result = await db.executeQuery(
            `INSERT INTO equivalence (numero_semaine, id_race, poids, sakafo)
             OUTPUT INSERTED.*
             VALUES (@numero_semaine, @id_race, @poids, @sakafo)`,
            { numero_semaine, id_race, poids, sakafo }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT e.id,
                    e.numero_semaine,
                    e.id_race,
                    e.poids,
                    e.sakafo,
                    r.nom AS race_nom,
                    r.description AS race_description
             FROM equivalence e
             INNER JOIN race r ON e.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT e.id,
                    e.numero_semaine,
                    e.id_race,
                    e.poids,
                    e.sakafo,
                    r.nom AS race_nom,
                    r.description AS race_description
             FROM equivalence e
             INNER JOIN race r ON e.id_race = r.id
             WHERE e.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(e) {
        // accept model instance or plain object
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(e, 'id', 'getId');
        const _semaine = get(e, 'numero_semaine', 'getNumeroSemaine');
        const _poids = get(e, 'poids', 'getPoids');
        const _sakafo = get(e, 'sakafo', 'getSakafo');
        const _id_race = get(e, 'id_race', 'getIdRace');

        const result = await db.executeQuery(
            `UPDATE equivalence
             SET numero_semaine = @numero_semaine,
                 id_race = @id_race,
                 poids = @poids,
                 sakafo = @sakafo
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, numero_semaine: _semaine, id_race: _id_race, poids: _poids, sakafo: _sakafo }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM equivalence WHERE id = @id', { id });
    }

    async findByRaceId(raceId) {
        const result = await db.executeQuery(
            `SELECT * FROM equivalence 
             WHERE id_race = @raceId 
             ORDER BY numero_semaine ASC`,
            { raceId }
        );
        return result.recordset;
    }
}

module.exports = new EquivalenceRepository();
