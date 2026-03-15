const db = require('../database/db');

class EtatAtodyRepository {
    async create({ id_atody, type, nombre, date }) {
        const result = await db.executeQuery(
            `INSERT INTO etatAtody (id_atody, [type], nombre, date)
             OUTPUT INSERTED.*
             VALUES (@id_atody, @type, @nombre, @date)`,
            { id_atody, type, nombre, date }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT ea.id,
                    ea.id_atody,
                    ea.[type],
                    ea.nombre,
                    ea.date,
                    a.id_lot,
                    l.nom AS lot_nom,
                    l.id_race,
                    r.nom AS race_nom
             FROM etatAtody ea
             INNER JOIN atody a ON ea.id_atody = a.id
             INNER JOIN lot l ON a.id_lot = l.id
             INNER JOIN race r ON l.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT ea.id,
                    ea.id_atody,
                    ea.[type],
                    ea.nombre,
                    ea.date,
                    a.id_lot,
                    l.nom AS lot_nom,
                    l.id_race,
                    r.nom AS race_nom
             FROM etatAtody ea
             INNER JOIN atody a ON ea.id_atody = a.id
             INNER JOIN lot l ON a.id_lot = l.id
             INNER JOIN race r ON l.id_race = r.id
             WHERE ea.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(ea) {
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(ea, 'id', 'getId');
        const _id_atody = get(ea, 'id_atody', 'getIdAtody');
        const _type = get(ea, 'type', 'getType');
        const _nombre = get(ea, 'nombre', 'getNombre');
        const _date = get(ea, 'date', 'getDate');

        const result = await db.executeQuery(
            `UPDATE etatAtody
             SET id_atody = @id_atody,
                 [type] = @type,
                 nombre = @nombre,
                 date = @date
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, id_atody: _id_atody, type: _type, nombre: _nombre, date: _date }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM etatAtody WHERE id = @id', { id });
    }
}

module.exports = new EtatAtodyRepository();
