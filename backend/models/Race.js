class Race {
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
    }

    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    setNom(nom) {
        this.nom = nom;
    }

    setId(id) {
        this.id = id;
    }
}

module.exports = Race;