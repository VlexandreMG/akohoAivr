class PrixAchat {
    constructor(id, id_race, semaine_initial, prix_akoho_unitaire, prix_atody_unitaire) {
        this.id = id;
        this.id_race = id_race;
        this.semaine_initial = semaine_initial;
        this.prix_akoho_unitaire = prix_akoho_unitaire;
        this.prix_atody_unitaire = prix_atody_unitaire;
    }

    getId() { return this.id; }
    getIdRace() { return this.id_race; }
    getSemaineInitial() { return this.semaine_initial; }
    getPrixAkohoUnitaire() { return this.prix_akoho_unitaire; }
    getPrixAtodyUnitaire() { return this.prix_atody_unitaire; }

    setId(id) { this.id = id; }
    setIdRace(id) { this.id_race = id; }
    setSemaineInitial(s) { this.semaine_initial = s; }
    setPrixAkohoUnitaire(p) { this.prix_akoho_unitaire = p; }
    setPrixAtodyUnitaire(p) { this.prix_atody_unitaire = p; }
}

module.exports = PrixAchat;
