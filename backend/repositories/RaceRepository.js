const db = require('../database/db');

class RaceRepository {
    async create({ nom, description = null }) {
        const result = await db.executeQuery(
            `INSERT INTO race (nom, description)
             OUTPUT INSERTED.*
             VALUES (@nom, @description)`,
            { nom, description }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery('SELECT * FROM race');
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery('SELECT * FROM race WHERE id = @id', { id });
        return result.recordset[0];
    }

    async update(r) {
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(r, 'id', 'getId');
        const _nom = get(r, 'nom', 'getNom');
        const _description = get(r, 'description', 'getDescription');

        const result = await db.executeQuery(
            `UPDATE race
             SET nom = @nom,
                 description = @description
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, nom: _nom, description: _description }
        );
        return result.recordset[0];
    }

    async delete(id) {
        const result = await db.executeQuery('DELETE FROM race WHERE id = @id', { id });
        return result;
    }
}

module.exports = new RaceRepository();
