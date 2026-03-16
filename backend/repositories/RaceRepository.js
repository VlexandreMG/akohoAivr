// repositories/RaceRepository.js
const db = require('../database/db');

class RaceRepository {
    // CREATE
    async create({ nom, percentMale, percentFemale, capPondaison, percentLamokana }) {
        const result = await db.executeQuery(
            `INSERT INTO race (nom, percentMale, percentFemale, capPondaison, percentLamokana)
             OUTPUT INSERTED.*
             VALUES (@nom, @percentMale, @percentFemale, @capPondaison, @percentLamokana)`,
            { nom, percentMale, percentFemale, capPondaison, percentLamokana }
        );
        return result.recordset[0];
    }

    // READ ALL
    async findAll() {
        const result = await db.executeQuery('SELECT * FROM race ORDER BY nom ASC');
        return result.recordset;
    }

    // READ ONE
    async findById(id) {
        const result = await db.executeQuery(
            'SELECT * FROM race WHERE id = @id',
            { id }
        );
        return result.recordset[0] || null;
    }

    // UPDATE
    async update(race) {
        // Supporte à la fois objet plain et instance de Race
        const get = (obj, prop, getter) => 
            (obj && (obj[prop] !== undefined ? obj[prop] : (typeof obj[getter] === 'function' ? obj[getter]() : undefined)));

        const _id                = get(race, 'id',                'getId');
        const _nom               = get(race, 'nom',               'getNom');
        const _percentMale       = get(race, 'percentMale',       'getPercentMale');
        const _percentFemale     = get(race, 'percentFemale',     'getPercentFemale');
        const _capPondaison      = get(race, 'capPondaison',      'getCapPondaison');
        const _percentLamokana   = get(race, 'percentLamokana',   'getPercentLamokana');

        const result = await db.executeQuery(
            `UPDATE race
             SET nom = @nom,
                 percentMale = @percentMale,
                 percentFemale = @percentFemale,
                 capPondaison = @capPondaison,
                 percentLamokana = @percentLamokana
             OUTPUT INSERTED.*
             WHERE id = @id`,
            { 
                id: _id,
                nom: _nom,
                percentMale: _percentMale,
                percentFemale: _percentFemale,
                capPondaison: _capPondaison,
                percentLamokana: _percentLamokana 
            }
        );

        return result.recordset[0] || null;
    }

    // DELETE
    async delete(id) {
        const result = await db.executeQuery(
            'DELETE FROM race WHERE id = @id',
            { id }
        );
        return result.rowsAffected[0] > 0;
    }

    // Méthode bonus utile : trouver par nom (approximatif ou exact)
    async findByNom(nom) {
        const result = await db.executeQuery(
            'SELECT * FROM race WHERE nom LIKE @nom',
            { nom: `%${nom}%` }
        );
        return result.recordset;
    }
}

module.exports = new RaceRepository();