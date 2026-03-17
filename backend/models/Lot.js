class Lot {
    constructor(id, nom, nombre, daty, origine, id_race, semaine_initial, prix_achat) {
        this.id = id;
        this.nom = nom;
        this.nombre = nombre;
        this.daty = daty;
        this.origine = origine;
        this.prix_achat = prix_achat;
        this.id_race = id_race;
        this.semaine_initial = semaine_initial;
    }

    getPrixAchat() { return this.prix_achat; }
    getId() { return this.id; }
    getNom() { return this.nom; }
    getNombre() { return this.nombre; }
    getDaty() { return this.daty; }
    getOrigine() { return this.origine; }
    getIdRace() { return this.id_race; }
    getSemaineInitial() { return this.semaine_initial; }

    setPrixAchat(p) { this.prix_achat = p; }
    setId(id) { this.id = id; }
    setNom(n) { this.nom = n; }
    setNombre(nb) { this.nombre = nb; }
    setDaty(d) { this.daty = d; }
    setOrigine(o) { this.origine = o; }
    setIdRace(id) { this.id_race = id; }
    setSemaineInitial(s) { this.semaine_initial = s; }
}

module.exports = Lot;
