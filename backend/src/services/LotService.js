
const { getConnection } = require("../config/database");
const Utilitaire = require("./Utilitaire");
const AkohoMatyService = require("./AkohoMatyService");
const RaceService = require("./RaceService");
const EquivalenceService = require("./EquivalenceService");
const EtatAtodyService = require("./EtatAtodyService");
const PrixSakafoService = require("./PrixSakafoService");
const PrixVenteService = require("./PrixVenteService");



class LotService {

    static async getAll() {
        const db = await getConnection();
        const result = await db.request().query("SELECT * FROM lot");
        return result.recordset;
    }
    static async getAllinfDate(date) {
        const db = await getConnection();
        const result = await db.request()
            .input("date", date)
            .query("SELECT * FROM lot WHERE daty <= @date");
        return result.recordset;
    }

    static async createZanakaLot(nom, nombre, daty, id_race, semaine_initial, origine) {
        const { executeQuery } = require("../config/database");
        const params = {
            nom: nom,
            nombre: Number(nombre),
            daty: daty,
            id_race: Number(id_race),
            semaine_initial: Number(semaine_initial),
            origine: origine
        };
        const result = await executeQuery(
            `INSERT INTO lot (nom, nombre, daty, id_race, semaine_initial, origine)
                 OUTPUT INSERTED.*
                 VALUES (@nom, @nombre, @daty, @id_race, @semaine_initial, @origine)`,
            params
        );
        return result.recordset[0];
    }

    static async getById(id) {
        const db = await getConnection();
        const result = await db.request()
            .input("id", id)
            .query("SELECT * FROM lot WHERE id=@id");
        return result.recordset[0];
    }

    static async create(data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const cols = keys.join(",");
        const params = keys.map(k => "@" + k).join(",");

        let req = db.request();
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`INSERT INTO lot (${cols}) VALUES (${params})`);
    }

    static async update(id, data) {
        const db = await getConnection();
        const keys = Object.keys(data);
        const set = keys.map(k => k + "=@" + k).join(",");

        let req = db.request().input("id", id);
        keys.forEach(k => req.input(k, data[k]));

        await req.query(`UPDATE lot SET ${set} WHERE id=@id`);
    }

    static async delete(id) {
        const db = await getConnection();
        await db.request()
            .input("id", id)
            .query("DELETE FROM lot WHERE id=@id");
    }

    static async getDateInitiale(lotId, numeroSemaine) {
        const lot = await this.getById(lotId);
        if (!lot) return null;

        const dateLot = await Utilitaire.normalizeDate(lot.daty);

        let dateInitiale;

        if (numeroSemaine === 0) {
            dateInitiale = new Date(
                dateLot.getFullYear(),
                dateLot.getMonth(),
                dateLot.getDate() + 1
            );
        } else {
            dateInitiale = new Date(
                dateLot.getFullYear(),
                dateLot.getMonth(),
                dateLot.getDate() - ((numeroSemaine - 1) * 7)
            );
        }

        return dateInitiale;
    }


    static async getDateByNumeroSemaineEtJourAvecInitial(lotId, numSemaine, numJour) {
        const lot = await this.getById(lotId);
        if (!lot) return null;

        const { numSemaine: semaine, numJour: jour } = await Utilitaire.validateWeekAndDay(numSemaine, numJour);
        const dateLot = await Utilitaire.normalizeDate(lot.daty);

        let dateResult;

        if (lot.semaine_initial === 0) {
            if (semaine === 0) {
                dateResult = new Date(dateLot);
            } else {
                const joursDepuisSemaine1 = ((semaine - 1) * 7) + (jour - 1);
                dateResult = new Date(
                    dateLot.getFullYear(),
                    dateLot.getMonth(),
                    dateLot.getDate() + 1 + joursDepuisSemaine1
                );
            }
        } else {
            const joursDepuisDaty = ((semaine - lot.semaine_initial) * 7) + (jour - 1);
            dateResult = new Date(
                dateLot.getFullYear(),
                dateLot.getMonth(),
                dateLot.getDate() + joursDepuisDaty
            );
        }

        return Utilitaire.formatDate(dateResult);
    };



    static async getRestVivant(lotId, date) {
        const lot = await this.getById(lotId);
        if (!lot) return null;

        const dateDebut = await Utilitaire.normalizeDate(lot.daty);
        const dateCible = await Utilitaire.normalizeDate(date);

        if (dateCible < dateDebut) {
            return 0;
        }

        const totalMaty = await AkohoMatyService.getTotalMatyByLotAndDate(lotId, date);
        const resteVivants = Math.max(lot.nombre - totalMaty, 0);

        return resteVivants;
    }

    static async getRestSexe(idLot, date) {
        const lot = await this.getById(idLot);
        if (!lot) {
            return null;
        }
        const akohoMaty = await AkohoMatyService.getTotalMatySexeByLotAndDate(idLot, date);
        const race = await RaceService.getById(lot.id_race);
        if (!race) {
            return null;
        }
        if (lot.origine !== 'akoho') {


            const pourcentage_femelle = race.pourcentage_femelle;
            const pourcentage_male = 100 - pourcentage_femelle;

            const bandy = Math.round(lot.nombre * pourcentage_male / 100) - akohoMaty.totalMatyLahy;
            const sipa = Math.round(lot.nombre * pourcentage_femelle / 100) - akohoMaty.totalMatyVavy;

            return {
                totalVelona: await this.getRestVivant(idLot, date),
                totalVelonaLahy: bandy,
                totalVelonaVavy: sipa
            };
        } else {
            return {
                totalVelona: await this.getRestVivant(idLot, date),
                totalVelonaLahy: 0,
                totalVelonaVavy: await this.getRestVivant(idLot, date)
            };
        }

    }

    static async getSakafoLany(lotId, date) {
        const lot = await this.getById(lotId);
        let result = 0;
        const equivalence = await EquivalenceService.getEquivalenceByRaceIdDepuitSemaine(lot.id_race, lot.semaine_initial);
        for (let i = 0; i < equivalence.length; i++) {
            const eq = equivalence[i];
            const poid = eq.sakafo / 7;
            for (let j = 1; j <= 7; j++) {
                const date_jour = await this.getDateByNumeroSemaineEtJourAvecInitial(lotId, eq.numero_semaine, j);
                const totalMaty = await AkohoMatyService.getTotalMatyByLotAndDate(lotId, date_jour);
                const dateJourObj = await Utilitaire.normalizeDate(date_jour);
                const dateParamObj = await Utilitaire.normalizeDate(date);
                if (dateJourObj > dateParamObj) {
                    break;
                }
                result += poid * (lot.nombre - totalMaty);
            }
        }
        return result;
    };

    static async getlanja(lotId, date) {
        const lot = await this.getById(lotId);
        const equivalence = await EquivalenceService.getEquivalenceByIdRace(lot.id_race);

        let result = equivalence[0].poids;
        console.log('poid initial:', result);
        for (let i = 1; i < equivalence.length; i++) {
            const eq = equivalence[i];
            const poids = eq.poids / 7;
            for (let j = 1; j <= 7; j++) {
                const date_jour = await this.getDateByNumeroSemaineEtJourAvecInitial(lotId, eq.numero_semaine, j);
                if (await Utilitaire.normalizeDate(date_jour) > await Utilitaire.normalizeDate(date)) {
                    break;
                } else {
                    result += poids;
                }

            }
        }
        return result;
    };

    static async getPoidsActuel(lotId, date) {
        const lot = await this.getById(lotId);

        if (!lot) return { getPoidsActuel: 0 };


        const dateCible = await Utilitaire.normalizeDate(date);
        const dateLot = await Utilitaire.normalizeDate(lot.daty);

        if (dateCible < dateLot) {
            return { getPoidsActuel: 0 };
        }
        const resteVivants = await this.getRestVivant(lotId, date);
        console.log('reste vivants:', resteVivants);
        let poidss = await RaceService.getPoidsTotal(lot.id_race, lot.daty, date);
        if (lot.semaine_initial === 0) {
            poidss = await this.getlanja(lotId, date);
        }


        return poidss * resteVivants;
    };

    static async getSituation(lotId, date) {
        const lot = await this.getById(lotId);
        const race = await RaceService.getById(lot.id_race);
        if (!lot) return null;
        const poids = await this.getPoidsActuel(lotId, date);
        const kaly = await this.getSakafoLany(lotId, date);
        const vivant = await this.getRestSexe(lotId, date);
        const mort = await AkohoMatyService.getTotalMatySexeByLotAndDate(lotId, date);
        const list = await EtatAtodyService.getEtatAtodyByLotId(lotId);
        let somme = 0;
        for (let i = 0; i < list.length; i++) {
            const etat = list[i];
            somme += await EtatAtodyService.resteAtody(etat.id, date);
        }
        const prixVente = await PrixVenteService.getById(1);
        const prixVenteAkoho_g = prixVente ? prixVente.prix_akoho_g : 0;
        const prixVenteAtody_u = prixVente ? prixVente.prix_atody_unitaire : 0;
        const prix_achat = lot.prix_achat;
        const prixSakafoObj = await PrixSakafoService.getById(2);
        const prixSakafo = prixSakafoObj ? prixSakafoObj.prix : 0;
        const benefice = (poids * prixVenteAkoho_g) + (somme * prixVenteAtody_u) - prix_achat - kaly * prixSakafo;
        return {
            id: lot.id,
            nom: lot.nom,
            race: race.nom,
            nombre: lot.nombre,
            dateEntree: await Utilitaire.formatDateWithTime(lot.daty),
            poids: poids,
            sakafo: kaly,
            vivant: vivant,
            mort: mort,
            atodyRestant: somme,
            estimationAtody: somme * prixVenteAtody_u,
            estimationAkoho: prixVenteAkoho_g * poids,
            achat: prix_achat,
            benefice: benefice
        };
    }

}

module.exports = LotService;
