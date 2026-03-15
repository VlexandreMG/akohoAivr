const db = require('../database/db');

class PrixVenteRepository {
    async create({ id_race, prix_akoho_g, prix_atody_unitaire }) {
        const result = await db.executeQuery(
            `INSERT INTO prix_vente (id_race, prix_akoho_g, prix_atody_unitaire)
             OUTPUT INSERTED.*
             VALUES (@id_race, @prix_akoho_g, @prix_atody_unitaire)`,
            { id_race, prix_akoho_g, prix_atody_unitaire }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT pv.id,
                    pv.id_race,
                    pv.prix_akoho_g,
                    pv.prix_atody_unitaire,
                    r.nom AS race_nom,
                    r.description AS race_description
             FROM prix_vente pv
             INNER JOIN race r ON pv.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT pv.id,
                    pv.id_race,
                    pv.prix_akoho_g,
                    pv.prix_atody_unitaire,
                    r.nom AS race_nom,
                    r.description AS race_description
             FROM prix_vente pv
             INNER JOIN race r ON pv.id_race = r.id
             WHERE pv.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(p) {
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(p, 'id', 'getId');
        const _id_race = get(p, 'id_race', 'getIdRace');
        const _prix_akoho = get(p, 'prix_akoho_g', 'getPrixAkohoG');
        const _prix_atody = get(p, 'prix_atody_unitaire', 'getPrixAtodyUnitaire');

        const result = await db.executeQuery(
            `UPDATE prix_vente
             SET id_race = @id_race,
                 prix_akoho_g = @prix_akoho_g,
                 prix_atody_unitaire = @prix_atody_unitaire
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, id_race: _id_race, prix_akoho_g: _prix_akoho, prix_atody_unitaire: _prix_atody }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM prix_vente WHERE id = @id', { id });
    }
}

module.exports = new PrixVenteRepository();
