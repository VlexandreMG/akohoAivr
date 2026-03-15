class PrixVente {
    constructor(id, id_race, prix_akoho_g, prix_atody_unitaire) {
        this.id = id;
        this.id_race = id_race;
        this.prix_akoho_g = prix_akoho_g;
        this.prix_atody_unitaire = prix_atody_unitaire;
    }

    getId() { return this.id; }
    getIdRace() { return this.id_race; }
    getPrixAkohoG() { return this.prix_akoho_g; }
    getPrixAtodyUnitaire() { return this.prix_atody_unitaire; }

    setId(id) { this.id = id; }
    setIdRace(id) { this.id_race = id; }
    setPrixAkohoG(p) { this.prix_akoho_g = p; }
    setPrixAtodyUnitaire(p) { this.prix_atody_unitaire = p; }
}

module.exports = PrixVente;
