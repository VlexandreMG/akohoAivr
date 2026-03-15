class BilanLot {
    constructor(
        id,
        id_lot,
        nombre_poulets,          // vivants à cette date
        prix_achat_total,
        cout_nourriture_total,
        nombre_morts,
        poids_moyen,
        prix_vente_lot,          // valeur totale du lot à la vente
        nombre_oeufs,
        valeur_oeufs_total,
        benefice
    ) {
        this.id = id;
        this.id_lot = id_lot;
        this.nombre_poulets = nombre_poulets;
        this.prix_achat_total = prix_achat_total;
        this.cout_nourriture_total = cout_nourriture_total;
        this.nombre_morts = nombre_morts;
        this.poids_moyen = poids_moyen;
        this.prix_vente_lot = prix_vente_lot;
        this.nombre_oeufs = nombre_oeufs;
        this.valeur_oeufs_total = valeur_oeufs_total;
        this.benefice = benefice;
    }

    // Getters
    getId() { return this.id; }
    getIdLot() { return this.id_lot; }
    getNombrePoulets() { return this.nombre_poulets; }
    getPrixAchatTotal() { return this.prix_achat_total; }
    getCoutNourritureTotal() { return this.cout_nourriture_total; }
    getNombreMorts() { return this.nombre_morts; }
    getPoidsMoyen() { return this.poids_moyen; }
    getPrixVenteLot() { return this.prix_vente_lot; }
    getNombreOeufs() { return this.nombre_oeufs; }
    getValeurOeufsTotal() { return this.valeur_oeufs_total; }
    getBenefice() { return this.benefice; }

    // Setters
    setId(id) { this.id = id; }
    setIdLot(id_lot) { this.id_lot = id_lot; }
    setNombrePoulets(n) { this.nombre_poulets = n; }
    setPrixAchatTotal(p) { this.prix_achat_total = p; }
    setCoutNourritureTotal(c) { this.cout_nourriture_total = c; }
    setNombreMorts(m) { this.nombre_morts = m; }
    setPoidsMoyen(p) { this.poids_moyen = p; }
    setPrixVenteLot(p) { this.prix_vente_lot = p; }
    setNombreOeufs(n) { this.nombre_oeufs = n; }
    setValeurOeufsTotal(v) { this.valeur_oeufs_total = v; }
    setBenefice(b) { this.benefice = b; }
}

module.exports = BilanLot;