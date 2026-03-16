class Race {
    constructor(id, nom, percentMale, percentFemale,capPondaison,percentLamokana) {
        this.id = id;
        this.nom = nom;
        this.percentMale = percentMale;
        this.percentFemale = percentFemale;
        this.capPondaison = capPondaison;
        this.percentLamokana = percentLamokana;
    }

    getPercentMale() {
        return this.percentMale;
    }

    getPercentFemale() {
        return this.percentFemale;
    }
    
    getCapPondaison() {
        return this.capPondaison;
    }

    getPercentLamokana() {
        return this.percentLamokana;
    }

    setPercentMale(percentMale) {
        this.percentMale = percentMale;
    }

    setPercentFemale(percentFemale) {
        this.percentFemale = percentFemale;
    }
    
    setCapPondaison(capPondaison) {
        this.capPondaison = capPondaison;
    }

    setPercentLamokana(percentLamokana) {
        this.percentLamokana = percentLamokana;
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