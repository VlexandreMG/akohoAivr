const db = require('../database/db');

class PrixAchatRepository {
    async create({ id_race, prix_akoho_unitaire, prix_atody_unitaire }) {
        const result = await db.executeQuery(
            `INSERT INTO prix_achat (id_race, prix_akoho_unitaire, prix_atody_unitaire)
             OUTPUT INSERTED.*
             VALUES (@id_race, @prix_akoho_unitaire, @prix_atody_unitaire)`,
            { id_race, prix_akoho_unitaire, prix_atody_unitaire }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT pa.id,
                    pa.id_race,
                    pa.prix_akoho_unitaire,
                    pa.prix_atody_unitaire,
                    r.nom AS race_nom,
                    r.description AS race_description
             FROM prix_achat pa
             INNER JOIN race r ON pa.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT pa.id,
                    pa.id_race,
                    pa.prix_akoho_unitaire,
                    pa.prix_atody_unitaire,
                    r.nom AS race_nom,
                    r.description AS race_description
             FROM prix_achat pa
             INNER JOIN race r ON pa.id_race = r.id
             WHERE pa.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(p) {
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(p, 'id', 'getId');
        const _id_race = get(p, 'id_race', 'getIdRace');
        const _prix_akoho = get(p, 'prix_akoho_unitaire', 'getPrixAkohoUnitaire');
        const _prix_atody = get(p, 'prix_atody_unitaire', 'getPrixAtodyUnitaire');

        const result = await db.executeQuery(
            `UPDATE prix_achat
             SET id_race = @id_race,
                 prix_akoho_unitaire = @prix_akoho_unitaire,
                 prix_atody_unitaire = @prix_atody_unitaire
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, id_race: _id_race, prix_akoho_unitaire: _prix_akoho, prix_atody_unitaire: _prix_atody }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM prix_achat WHERE id = @id', { id });
    }
}

module.exports = new PrixAchatRepository();
