class Equivalence {
    constructor(id, numero_semaine, id_race, poids, sakafo,prixSakafo) {
        this.id = id;
        this.numero_semaine = numero_semaine;
        this.id_race = id_race;
        this.poids = poids;
        this.sakafo = sakafo;
        this.prixSakafo = prixSakafo;
    }

    getId() { return this.id; }
    getNumeroSemaine() { return this.numero_semaine; }
    getIdRace() { return this.id_race; }
    getPoids() { return this.poids; }
    getSakafo() { return this.sakafo; }
    getPrixSakafo() { return this.prixSakafo; }

    setId(id) { this.id = id; }
    setNumeroSemaine(n) { this.numero_semaine = n; }
    setIdRace(id) { this.id_race = id; }
    setPoids(p) { this.poids = p; }
    setSakafo(s) { this.sakafo = s; }
    setPrixSakafo(p) { this.prixSakafo = p; }
}

module.exports = Equivalence;
