const db = require('../database/db');

class AtodyRepository {
    async create({ id_lot, nombre, date }) {
        const result = await db.executeQuery(
            `INSERT INTO atody (id_lot, nombre, date)
             OUTPUT INSERTED.*
             VALUES (@id_lot, @nombre, @date)`,
            { id_lot, nombre, date }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT a.id,
                    a.id_lot,
                    a.nombre,
                    a.date,
                    l.nom AS lot_nom,
                    l.id_race,
                    r.nom AS race_nom
             FROM atody a
             INNER JOIN lot l ON a.id_lot = l.id
             INNER JOIN race r ON l.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT a.id,
                    a.id_lot,
                    a.nombre,
                    a.date,
                    l.nom AS lot_nom,
                    l.id_race,
                    r.nom AS race_nom
             FROM atody a
             INNER JOIN lot l ON a.id_lot = l.id
             INNER JOIN race r ON l.id_race = r.id
             WHERE a.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(a) {
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(a, 'id', 'getId');
        const _id_lot = get(a, 'id_lot', 'getIdLot');
        const _nombre = get(a, 'nombre', 'getNombre');
        const _date = get(a, 'date', 'getDate');

        const result = await db.executeQuery(
            `UPDATE atody
             SET id_lot = @id_lot,
                 nombre = @nombre,
                 date = @date
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, id_lot: _id_lot, nombre: _nombre, date: _date }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM atody WHERE id = @id', { id });
    }

    async findByLotId(lotId) {
        const result = await db.executeQuery(
            `SELECT * FROM atody WHERE id_lot = @lotId ORDER BY date ASC`,
            { lotId }
        );
        return result.recordset;
    }

    async getTotalAtodyByLotAndDate(lotId, date) {
        const result = await db.executeQuery(
            `SELECT ISNULL(SUM(nombre), 0) AS total_atody
             FROM atody
             WHERE id_lot = @lotId AND date <= @date`,
            { lotId, date }
        );
        return result.recordset[0].total_atody;
    }
}

module.exports = new AtodyRepository();
