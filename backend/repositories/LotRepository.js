const db = require('../database/db');

class LotRepository {
    // CREATE
    async create({ nom, nombre, daty, origine, id_race, semaine_initial, prix_achat }) {
        const result = await db.executeQuery(
            `INSERT INTO lot (nom, nombre, daty, origine, id_race, semaine_initial, prix_achat)
             OUTPUT INSERTED.*
             VALUES (@nom, @nombre, @daty, @origine, @id_race, @semaine_initial, @prix_achat)`,
            { nom, nombre, daty, origine, id_race, semaine_initial, prix_achat }
        );
        return result.recordset[0];
    }

    // READ ALL
    async findAll() {
        const result = await db.executeQuery(
            `SELECT l.*,
                    r.nom AS race_nom
             FROM lot l
             LEFT JOIN race r ON l.id_race = r.id
             ORDER BY l.daty DESC`
        );
        return result.recordset;
    }

    // READ ONE
    async findById(id) {
        const result = await db.executeQuery(
            `SELECT l.*,
                    r.nom AS race_nom
             FROM lot l
             LEFT JOIN race r ON l.id_race = r.id
             WHERE l.id = @id`,
            { id }
        );
        return result.recordset[0] || null;
    }

    // UPDATE
    async update(lot) {
        // Accepte objet plain ou instance de Lot
        const get = (obj, prop, getter) => 
            (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));

        const _id              = get(lot, 'id',              'getId');
        const _nom             = get(lot, 'nom',             'getNom');
        const _nombre          = get(lot, 'nombre',          'getNombre');
        const _daty            = get(lot, 'daty',            'getDaty');
        const _origine         = get(lot, 'origine',         'getOrigine');
        const _id_race         = get(lot, 'id_race',         'getIdRace');
        const _semaine_initial = get(lot, 'semaine_initial', 'getSemaineInitial');
        const _prix_achat      = get(lot, 'prix_achat',      'getPrixAchat');

        const result = await db.executeQuery(
            `UPDATE lot
             SET nom             = @nom,
                 nombre          = @nombre,
                 daty            = @daty,
                 origine         = @origine,
                 id_race         = @id_race,
                 semaine_initial = @semaine_initial,
                 prix_achat      = @prix_achat
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { 
                id: _id,
                nom: _nom,
                nombre: _nombre,
                daty: _daty,
                origine: _origine,
                id_race: _id_race,
                semaine_initial: _semaine_initial,
                prix_achat: _prix_achat 
            }
        );

        return result.recordset[0] || null;
    }

    // DELETE
    async delete(id) {
        const result = await db.executeQuery(
            'DELETE FROM lot WHERE id = @id',
            { id }
        );
        return result.rowsAffected[0] > 0;
    }

    // Méthode bonus : lots par race
    async findByRaceId(raceId) {
        const result = await db.executeQuery(
            `SELECT * FROM lot 
             WHERE id_race = @raceId 
             ORDER BY daty DESC`,
            { raceId }
        );
        return result.recordset;
    }

    // Méthode bonus : lots actifs (non terminés) à une date donnée
    async findActiveLotsAtDate(date) {
        const result = await db.executeQuery(
            `SELECT * FROM lot 
             WHERE daty <= @date 
             ORDER BY daty DESC`,
            { date }
        );
        return result.recordset;
    }
}

module.exports = new LotRepository();