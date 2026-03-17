const db = require('../database/db');

class EquivalenceRepository {
    async create({ numero_semaine, id_race, poids, sakafo, prixSakafo }) {
        const result = await db.executeQuery(
            `INSERT INTO equivalence (numero_semaine, id_race, poids, sakafo, prix_sakafo)
             OUTPUT INSERTED.*
             VALUES (@numero_semaine, @id_race, @poids, @sakafo, @prix_sakafo)`,
            { numero_semaine, id_race, poids, sakafo, prix_sakafo: prixSakafo }
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
                    e.prix_sakafo,
                    r.nom AS race_nom
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
                    e.prix_sakafo,
                    r.nom AS race_nom
                 FROM equivalence e
                 INNER JOIN race r ON e.id_race = r.id
                 WHERE e.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(e) {
        // Accepte soit un objet plain, soit une instance de Equivalence
        const get = (obj, prop, getter) => 
            (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));

        const _id           = get(e, 'id',           'getId');
        const _semaine      = get(e, 'numero_semaine','getNumeroSemaine');
        const _id_race      = get(e, 'id_race',      'getIdRace');
        const _poids        = get(e, 'poids',        'getPoids');
        const _sakafo       = get(e, 'sakafo',       'getSakafo');
        const _prixSakafo   = get(e, 'prix_sakafo',   'getPrixSakafo');

        const result = await db.executeQuery(
            `UPDATE equivalence
             SET numero_semaine = @numero_semaine,
                 id_race        = @id_race,
                 poids          = @poids,
                 sakafo         = @sakafo,
                 prix_sakafo    = @prix_sakafo
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { 
                id: _id, 
                numero_semaine: _semaine, 
                id_race: _id_race, 
                poids: _poids, 
                sakafo: _sakafo,
                prix_sakafo: _prixSakafo 
            }
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

    // Méthode bonus utile si tu veux récupérer la ligne pour une semaine précise
    async findByRaceAndWeek(raceId, numero_semaine) {
        const result = await db.executeQuery(
            `SELECT * FROM equivalence 
             WHERE id_race = @raceId 
               AND numero_semaine = @numero_semaine`,
            { raceId, numero_semaine }
        );
        return result.recordset[0] || null;
    }
}

module.exports = new EquivalenceRepository();