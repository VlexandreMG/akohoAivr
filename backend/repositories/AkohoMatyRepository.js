const db = require('../database/db');

class AkohoMatyRepository {
    async create({ id_lot, nombre, date, cause = null }) {
        const result = await db.executeQuery(
            `INSERT INTO akohoMaty (id_lot, nombre, date, cause)
             OUTPUT INSERTED.*
             VALUES (@id_lot, @nombre, @date, @cause)`,
            { id_lot, nombre, date, cause }
        );
        return result.recordset[0];
    }

    async findAll() {
        const result = await db.executeQuery(
            `SELECT am.id,
                    am.id_lot,
                    am.nombre,
                    am.date,
                    am.cause,
                    l.nom AS lot_nom,
                    l.id_race,
                    r.nom AS race_nom
             FROM akohoMaty am
             INNER JOIN lot l ON am.id_lot = l.id
             INNER JOIN race r ON l.id_race = r.id`
        );
        return result.recordset;
    }

    async findById(id) {
        const result = await db.executeQuery(
            `SELECT am.id,
                    am.id_lot,
                    am.nombre,
                    am.date,
                    am.cause,
                    l.nom AS lot_nom,
                    l.id_race,
                    r.nom AS race_nom
             FROM akohoMaty am
             INNER JOIN lot l ON am.id_lot = l.id
             INNER JOIN race r ON l.id_race = r.id
             WHERE am.id = @id`,
            { id }
        );
        return result.recordset[0];
    }

    async update(am) {
        const get = (obj, prop, getter) => (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));
        const _id = get(am, 'id', 'getId');
        const _id_lot = get(am, 'id_lot', 'getIdLot');
        const _nombre = get(am, 'nombre', 'getNombre');
        const _date = get(am, 'date', 'getDate');
        const _cause = get(am, 'cause', 'getCause');

        const result = await db.executeQuery(
            `UPDATE akohoMaty
             SET id_lot = @id_lot,
                 nombre = @nombre,
                 date = @date,
                 cause = @cause
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { id: _id, id_lot: _id_lot, nombre: _nombre, date: _date, cause: _cause }
        );
        return result.recordset[0];
    }

    async delete(id) {
        return await db.executeQuery('DELETE FROM akohoMaty WHERE id = @id', { id });
    }

    async getTotalMatyByLotAndDate(lotId, date) {
        const result = await db.executeQuery(
            `SELECT ISNULL(SUM(nombre), 0) AS total_maty
             FROM akohoMaty
             WHERE id_lot = @lotId AND date <= @date`,
            { lotId, date }
        );
        return result.recordset[0].total_maty;
    }

    async 
}

module.exports = new AkohoMatyRepository();
