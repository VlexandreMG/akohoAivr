class PrixSakafo {
    constructor(id, nom, prix, daty) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.daty = daty;
    }

    getId() { return this.id; }
    getNom() { return this.nom; }
    getPrix() { return this.prix; }
    getDaty() { return this.daty; }

    setId(id) { this.id = id; }
    setNom(n) { this.nom = n; }
    setPrix(p) { this.prix = p; }
    setDaty(d) { this.daty = d; }
}

module.exports = PrixSakafo;
