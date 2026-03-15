const db = require('../database/db');

class LotRepository {
    async create({ nom, nombre, daty, id_race }) {
        const result = await db.executeQuery(
            `INSERT INTO lot (nom, nombre, daty, id_race)
             OUTPUT INSERTED.*
             VALUES (@nom, @nombre, @daty, @id_race)`,
            { nom, nombre, daty, id_race }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT l.id,
                    l.nom,
                    l.nombre,
                    l.daty,
                    l.id_race,
                    r.nom AS race_nom,
                    r.description AS race_description,
                    r.created_at AS race_created_at
             FROM lot l
             INNER JOIN race r ON l.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT l.id,
                    l.nom,
                    l.nombre,
                    l.daty,
                    l.id_race,
                    r.nom AS race_nom,
                    r.description AS race_description,
                    r.created_at AS race_created_at
             FROM lot l
             INNER JOIN race r ON l.id_race = r.id
             WHERE l.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update({ id, nom, nombre, daty, id_race }) {
        // Accept either a plain object or a model instance with getters
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(arguments[0], 'id', 'getId');
        const _nom = get(arguments[0], 'nom', 'getNom');
        const _nombre = get(arguments[0], 'nombre', 'getNombre');
        const _daty = get(arguments[0], 'daty', 'getDaty');
        const _id_race = get(arguments[0], 'id_race', 'getIdRace');

        const result = await db.executeQuery(
            `UPDATE lot
             SET nom = @nom,
                 nombre = @nombre,
                 daty = @daty,
                 id_race = @id_race
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, nom: _nom, nombre: _nombre, daty: _daty, id_race: _id_race }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM lot WHERE id = @id', { id });
    }

    async findByRaceId(id) {
        const result = await db.executeQuery(
            `SELECT l.id,
                    l.nom,
                    l.nombre,
                    l.daty,
                    l.id_race,
                    r.nom AS race_nom,
                    r.description AS race_description,
                    r.created_at AS race_created_at
             FROM lot l
             INNER JOIN race r ON l.id_race = r.id
             WHERE l.id_race = @id`,
            { id }
        );
        return result.recordset;
    }

    async findLotById(id) {
        const result = await db.executeQuery(
            `SELECT * FROM lot WHERE id = @id`,
            { id }
        );
        return result.recordset[0] || null;
    }
}

module.exports = new LotRepository();
